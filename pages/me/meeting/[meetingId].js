import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ButtonGray, ButtonColor } from '../../../components/buttons';
import { FaMicrophoneSlash, FaMicrophone, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Hark from "hark";
import { connect } from 'react-redux';
import useResizeObserver from "use-resize-observer";
import FooterMeeting from './../../../components/FooterMeeting';
import MessagesSidebar from "../../../components/MessagesSidebar";
import VideoView from './../../../components/meetingVideoView';
import { useWebsocket } from './../../../services/socketService';
import { updateMeetingParticipants, addStream, deleteStream, deleteMeeting } from '../../../redux/slices/meetingSlice';

const mapStateToProps = state => ({
    user: state.user,
    meeting: state.meeting
})

const mapDispatchToProps = dispatch => {
    return {
        addStream: (streamData) => dispatch(addStream(streamData)),
        deleteStream: (userData) => dispatch(deleteStream(userData)),
        deleteMeeting: () => dispatch(deleteMeeting())
    }
}

const Meeting = (props) => {

    //others const  and hooks
    const router = useRouter();
    const { meetingId } = router.query;
    const socket = useWebsocket();

    //refs
    const videoRef = useRef(null)
    const videoGridDiv = useRef(null);
    const { ref, width, height } = useResizeObserver();

    //states
    const [cameraPermession, setcameraPermession] = useState(false);
    const [audioPermession, setaudioPermession] = useState(false);
    const [loadingCamView, setloadingCamView] = useState(true);
    const [yourStream, setYourStream] = useState(null);
    const [hark, sethark] = useState(null);
    const [audioVolume, setaudioVolume] = useState(0);
    const [ifJoined, setifJoined] = useState(false)
    const [isMessagesOpen, setisMessagesOpen] = useState(false)
    const [permissionsGranted, setpermissionsGranted] = useState(false)
    const [participantsList, setparticipantsList] = useState([])
    const [allStreams, setallStreams] = useState([]);

    //lifecycles
    useEffect(() => {
        getAudioVideo();

        return () => {
            cancelGoback(true);
        }
    }, []);

    //methods

    const startHark = (stream) => {
        if (!stream.getAudioTracks()[0]) {
            throw new Error("No audio stream found");
        }
        const harkTemp = Hark(stream, { play: false, interval: '360ms', threshold: '56db' })
        sethark(harkTemp);

        harkTemp.on('volume_change', (dBs, threshold) => {
            let audioVolumeCurrent = Math.round(Math.pow(10, dBs / 85) * 10);

            if (audioVolumeCurrent === 1) {
                audioVolumeCurrent = 0;
            }
            if (audioVolumeCurrent != audioVolume) {
                // console.log(audioVolumeCurrent,audioVolume);
                setaudioVolume(audioVolumeCurrent);
            }
        })
    }

    const createToast = message => {
        toast(message, {
            position: "bottom-right",
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "dark:bg-appColor-appExtraLight bg-gray-500 rounded-xl",
            bodyClassName: "dark:text-white text-black",
        })
    }

    const connectToPeers = async () => {

        const Peer = (await import('peerjs')).default

        var peer = new Peer(props.user.socketId, {
            secure: process.env.NEXT_PUBLIC_NODE_ENV != "devlopment",
            path: "/peerjs",
            key: process.env.NEXT_PUBLIC_PEERJS_KEY,
            // port: process.env.NEXT_PUBLIC_NODE_ENV == "devlopment" ? 8000 : 443,
            host: process.env.NEXT_PUBLIC_NODE_ENV == "devlopment" ? "/" : process.env.NEXT_PUBLIC_PEERJS_HOST
        })

        peer.on('open', id => {
            console.log("PEER ID", id);
            socket.emit('join-room', { id: meetingId })
            setifJoined(true);
        })

        socket.on('new-room-user', data => {
            // console.log('new user joined room', data.data);
            // setparticipantsList(participants => [...participants, data.data])
            if (data.data.socketId !== props.user.socketId) {
                console.log("new user inside called");

                var call = peer.call(data.data.socketId, yourStream);
                var videoCreated = false;
                call.on('stream', stream => {
                    if (!videoCreated) {
                        videoCreated = true;
                        const streamData = {
                            id: data.data.socketId,
                            // userData: data.data,
                            stream: stream
                        }
                        // setallStreams(streams => streams.concat(streamData))
                        props.addStream(streamData)
                    }
                })
                console.log(allStreams)
            }
        })

        peer.on('call', call => {
            console.log("incoming call");
            console.log(call.peer);
            call.answer(yourStream);
            var videoCreated = false;
            call.on('stream', stream => {
                if (!videoCreated) {
                    videoCreated = true;
                    const streamData = {
                        id: call.peer,
                        // userData: data.data,
                        stream: stream
                    }
                    // setallStreams(streams => streams.concat(streamData))
                    props.addStream(streamData)
                }

            })
            console.log(allStreams)
        })
    }

    const toggleVideo = () => {
        if (permissionsGranted) {
            if (cameraPermession) {
                yourStream.getVideoTracks()[0].enabled = !(yourStream.getVideoTracks()[0].enabled);
                setloadingCamView(true)
                setcameraPermession(false);
                socket.emit('toggle-video', { roomId: meetingId, value: false, id: props.user.socketId });
            }
            else {
                yourStream.getVideoTracks()[0].enabled = !(yourStream.getVideoTracks()[0].enabled);
                setloadingCamView(false);
                setcameraPermession(true);
                socket.emit('toggle-video', { roomId: meetingId, value: true, id: props.user.socketId });
                let video = videoRef.current;
                video.srcObject = yourStream;
                video.play();
                video.muted = true;
            }
        }
        else {
            getAudioVideo();
        }
    }


    const toggleAudio = () => {
        if (permissionsGranted) {
            if (audioPermession) {
                setaudioPermession(false);
                if (hark) {
                    hark.stop();
                    setaudioVolume(0)
                }
                yourStream.getAudioTracks()[0].enabled = !(yourStream.getAudioTracks()[0].enabled);
                socket.emit('toggle-audio', { roomId: meetingId, value: false, id: props.user.socketId });
            }
            else {
                yourStream.getAudioTracks()[0].enabled = !(yourStream.getAudioTracks()[0].enabled);
                setaudioPermession(true);
                socket.emit('toggle-audio', { roomId: meetingId, value: true, id: props.user.socketId });
                startHark(yourStream);
            }
        }
        else {
            getAudioVideo();
        }

    }

    const getAudioVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: "user" },
            // video: { aspectRatio: 1 / 1 },
            audio: true,
        })
            .then(stream => {
                // console.log("sucess");
                setpermissionsGranted(true);
                setYourStream(stream);
                setloadingCamView(false);
                setcameraPermession(true);
                setaudioPermession(true);
                startHark(stream);

                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
                video.muted = true;
            }
            )
            .catch(err => {
                console.log(err);
                setpermissionsGranted(false)
                createToast("Please allow camera and microphone permission to continue.");
            })
    }

    const cancelGoback = (unmout = false) => {
        if (yourStream) {
            yourStream.getTracks().forEach(track => {
                if (track.readyState == 'live') {
                    track.stop()
                }
            })
        }
        if (!unmout) {
            router.back();
        }
    }

    const joinMeeting = () => {
        if (permissionsGranted) {
            const streamData = {
                _id: props.user.user._id,
                id: props.user.socketId,
                name: props.user.user.name,
                picture: props.user.user.picture,
                stream: yourStream
            }
            // setallStreams([streamData])
            props.addStream(streamData)

            connectToPeers();
            startRoomEventListning();
        }
        else {
            getAudioVideo();
        }
    }

    const endCall = () => {
        setifJoined(false);
        socket.emit('leave-room');
        props.deleteMeeting();
        router.push('/')
    }


    const removeParticipant = (user) => {


    };

    const startRoomEventListning = () => {

        socket.on('new-room-user', data => {
            console.log('new user joined room', data.data);
            setparticipantsList(participants => [...participants, data.data])
        })

        socket.on("user-left", data => {
            console.log(data);
            // removeParticipant(data);
            props.deleteStream(data.data)
        })
    }

    //views

    if (ifJoined) {
        return (
            <div className="flex flex-row h-full w-full">
                <div className="relative flex h-full w-full pb-16 ">
                    <FooterMeeting
                        isMessagesOpen={isMessagesOpen}
                        toggleMessages={() => {
                            setisMessagesOpen(!isMessagesOpen)
                        }}
                        audioPermession={audioPermession}
                        cameraPermession={cameraPermession}
                        toggleVideo={toggleVideo}
                        toggleAudio={toggleAudio}
                        endCall={endCall}
                    />
                    <div ref={ref} className="flex relative w-full h-full overflow-hidden">
                        {/* <div className="grid w-full grid-flow-rows grid-cols-2 auto-col-fr  gap-2 justify-center items-center overflow-scroll scrollDiv ">
                            <VideoView video={yourStream} />
                            <VideoView video={yourStream} />
                            <VideoView video={yourStream} />
                        </div> */}
                        <div className="flex items-center flex-wrap content-center justify-center align-middle absolute inset-0">
                            {props.meeting.allStreams.map((stream, index) => {
                                return <VideoView index={index} video={stream} myId={props.user.socketId} parentDiv={{ width: width - 4, height: height - 4 }} totalLength={props.meeting.allStreams.length} />
                            })}
                        </div>
                    </div>
                </div>
                <MessagesSidebar participantsList={participantsList} meetingId={meetingId} isMessagesOpen={isMessagesOpen} closeMessages={() => { setisMessagesOpen(false) }} />
            </div>
        )
    }

    return (
        <div className="relative flex flex-col lg:flex-row justify-between lg:justify-evenly h-full items-start py-5 lg:items-center px-5">
            <div className={`flex flex-col justify-center self-center items-center lg:self-center ${loadingCamView && " w-2/4 h-auto"}`}>
                <>
                    <div className={`relative w-full h-48 md:h-64 lg:w-3/5  self-center ${loadingCamView ? "flex" : "hidden"}`} style={{
                        maxHeight: '416px', maxWidth: '742px', minHeight: '144px',
                    }} >
                        {audioPermession ?
                            <div className="absolute z-20 flex flex-row justify-evenly items-center bottom-5 left-5 p-1 w-10 h-10 rounded-full dark:bg-appColor-dark bg-appColor-light shadow-lg">
                                <div className={` bg-appColor-otherCardDark p-1 rounded-full barsmallLevel${audioVolume}`} />
                                <div className={` bg-appColor-otherCardDark p-1 rounded-full barlevel${audioVolume}`} />
                                <div className={` bg-appColor-otherCardDark p-1 rounded-full barsmallLevel${audioVolume}`} />
                            </div>
                            :
                            <div className="absolute z-20 flex flex-row justify-evenly items-center bottom-5 left-5 p-1 w-10 h-10 rounded-full dark:bg-appColor-dark bg-appColor-light shadow-lg">
                                <FaMicrophoneSlash size={22} />
                            </div>
                        }
                        <div className={`pulseDiv ${audioVolume > 2 ? "block" : "hiddenImp"}`} />
                        <div className=" z-10 w-full h-full flex justify-center items-center dark:bg-appColor-appLight bg-gray-300 rounded-xl text-base">
                            Camera is Off
                        </div>

                    </div>
                    <div className={`relative rounded-xl self-center ${loadingCamView ? "hidden" : "block"}`} >
                        {audioPermession ?
                            <div className="absolute z-20 flex flex-row justify-evenly items-center bottom-5 left-5 p-1 w-10 h-10 rounded-full dark:bg-appColor-dark bg-appColor-light shadow-lg">
                                <div className={` bg-appColor-otherCardDark p-1 rounded-full barsmallLevel${audioVolume}`} />
                                <div className={` bg-appColor-otherCardDark p-1 rounded-full barlevel${audioVolume}`} />
                                <div className={` bg-appColor-otherCardDark p-1 rounded-full barsmallLevel${audioVolume}`} />
                            </div>
                            :
                            <div className="absolute z-20 flex flex-row justify-evenly items-center bottom-5 left-5 p-1 w-10 h-10 rounded-full dark:bg-appColor-dark bg-appColor-light shadow-lg">
                                <FaMicrophoneSlash size={22} />
                            </div>
                        }
                        <div className={`pulseDiv ${audioVolume > 2 ? "block" : "hiddenImp"}`} />
                        <video ref={videoRef} className=" h-auto max-w-full rounded-xl overflow-hidden flipVideo object-cover" />
                    </div>
                </>
                <div className="flex flex-row self-center justify-center items-center py-4">
                    <ButtonGray
                        lable={audioPermession ?
                            <FaMicrophone size={30} />
                            :
                            <FaMicrophoneSlash size={30} className="text-red-800" />
                        }
                        onClick={() => { toggleAudio(); }}
                        className="mr-3 px-6"
                    />
                    <ButtonGray
                        lable={cameraPermession ?
                            <FaVideo size={30} />
                            :
                            <FaVideoSlash size={30} className="text-red-800" />
                        }
                        onClick={() => { toggleVideo() }}
                        className="ml-3 px-6"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full lg:w-auto lg:pl-6">
                <h3 className="font-bold text-lg line-clamp-1 max-w-md self-center ">CI/CD Pipeline crash Meeting</h3>
                <div className="flex flex-row pt-4 lg:w-auto w-full self-center justify-center items-center">
                    <ButtonGray
                        lable="Cancel"
                        onClick={() => { cancelGoback() }}
                        className="mr-3 px-6 self-stretch lg:self-center "
                    />
                    <ButtonColor
                        lable="Join"
                        onClick={() => { joinMeeting() }}
                        className="mr-3 px-6 self-stretch lg:self-center "
                    />
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);