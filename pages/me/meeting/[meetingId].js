import { useEffect, useState, useRef } from "react";
import { ButtonGray, ButtonColor } from '../../../components/buttons';
import { FaMicrophoneSlash, FaMicrophone, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Hark from "hark";

const Meeting = (props) => {

    //others const  and hooks
    const router = useRouter();

    //refs
    const videoRef = useRef(null)

    //states
    const [cameraPermession, setcameraPermession] = useState(false);
    const [audioPermession, setaudioPermession] = useState(false);
    const [loadingCamView, setloadingCamView] = useState(true);
    const [yourStream, setYourStream] = useState(null);
    const [yourAudioStream, setyourAudioStream] = useState(null);
    const [hark, sethark] = useState(null);
    const [audioVolume, setaudioVolume] = useState(0);

    //lifecycles
    useEffect(() => {
        getVideo();
        getAudio();

        return () => {
            cancelGoback(true);
        }
    }, []);

    //methods

    const startHark = (stream) => {
        if (!stream.getAudioTracks()[0]) {
            throw new Error("No audio stream found");
        }
        const harkTemp = Hark(stream, { play: false, interval: '300ms', threshold: '56db' })
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

    const toggleVideo = () => {
        if (cameraPermession) {
            setcameraPermession(false);
            videoRef.current.pause();
            setloadingCamView(true)
            videoRef.current.src = "";
            yourStream.getVideoTracks().forEach(track => {
                if (track.readyState == 'live') {
                    track.stop()
                }
            })
        }
        else {
            navigator.mediaDevices.getUserMedia({
                video: { width: 742, height: 416 },
            })
                .then(stream => {
                    setYourStream(stream);
                    setloadingCamView(false);
                    setcameraPermession(true);
                    let video = videoRef.current;
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err => {
                    console.log(err);
                    createToast('Allow camera permission for your video')
                })
        }

    }

    const toggleAudio = () => {
        if (audioPermession) {
            setaudioPermession(false);
            if (hark) {
                hark.stop();
                setaudioVolume(0)
            }
            yourAudioStream.getAudioTracks().forEach(track => {
                if (track.readyState == 'live') {
                    track.stop();
                }
            })
        }
        else {
            navigator.mediaDevices.getUserMedia({
                audio: true
            })
                .then(stream => {
                    setyourAudioStream(stream);
                    setaudioPermession(true);
                    startHark(stream);
                })
                .catch(err => {
                    console.log(err);
                    createToast('Allow audio permission to turn on mic')
                })
        }

    }


    const getAudio = () => {
        navigator.mediaDevices.getUserMedia({
            audio: true
        })
            .then(stream => {
                setyourAudioStream(stream);
                setaudioPermession(true);
                startHark(stream);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 742, height: 416 },
            // video: { aspectRatio: 1 / 1 },
            // audio: true,
        })
            .then(stream => {
                console.log("sucess");
                setYourStream(stream);
                setloadingCamView(false);
                setcameraPermession(true);

                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            }
            )
            .catch(err => {
                console.log(err);
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
        if (yourAudioStream) {
            yourAudioStream.getTracks().forEach(track => {
                if (track.readyState == 'live') {
                    track.stop();
                }
            })
        }
        if (!unmout) {
            router.back();
        }
    }

    //views
    return (
        <div className="relative flex flex-col lg:flex-row justify-between lg:justify-evenly h-full items-start py-5 lg:items-center px-5">
            <div className={`flex flex-col justify-center self-center items-center lg:self-center ${loadingCamView && " w-2/4 h-auto"}`}>
                {loadingCamView ?
                    <div className={`relative flex w-full h-48 md:h-64 lg:w-3/5  self-center `} style={{
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
                    :
                    <div className="relative rounded-xl self-center " >
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
                        <video ref={videoRef} className=" h-auto max-w-full rounded-xl overflow-hidden flipVideo" />
                    </div>
                }
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
                        onClick={() => { }}
                        className="mr-3 px-6 self-stretch lg:self-center "
                    />
                </div>
            </div>
        </div>
    )
}

export default Meeting;