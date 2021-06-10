import { useEffect, useState, useRef } from "react";
import { ButtonGray, ButtonColor } from '../../../components/buttons';
import { FaMicrophoneSlash, FaMicrophone, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Meeting = (props) => {

    //others const and hooks

    //refs
    const videoRef = useRef(null)

    //states
    const [cameraPermession, setcameraPermession] = useState(false);
    const [audioPermession, setaudioPermession] = useState(false);
    const [loadingCamView, setloadingCamView] = useState(true);
    const [yourStream, setYourStream] = useState(null);

    //lifecycles
    useEffect(() => {
        getAudioAndVideo();

        return () => {
            // const tracks = yourCamStream.getTracks();
            // tracks.forEach((track) => track.stop())
        }
    }, []);

    //methods

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
                    createToast('Allow camera and audio permission for your video')
                })
        }

    }

    const toggleAudio = () => {
        yourStream.getAudioTracks().forEach(track => {
            if (track.readyState == 'live') {
                track.stop();
            }
        })
    }
    const getAudioAndVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 742, height: 416 },
            // video: { aspectRatio: 1 / 1 },
            audio: true,
        })
            .then(stream => {
                console.log("sucess");
                setYourStream(stream);
                setloadingCamView(false);
                setcameraPermession(true);
                setaudioPermession(true);
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            }
            )
            .catch(err => {
                console.log(err);
            })
    }

    //views
    return (
        <div className="relative flex flex-col lg:flex-row justify-between lg:justify-evenly h-full items-start pt-5 md:pt-6 lg:pt-0 lg:items-center px-5">
            <div className={`flex flex-col justify-center self-center items-center lg:self-center ${loadingCamView && " w-2/4 h-auto"}`}>
                {loadingCamView ?
                    <div className="flex text-base w-full h-48 md:h-64 lg:w-3/5 dark:bg-appColor-appLight bg-gray-300 justify-center items-center rounded-xl overflow-hidden self-center" style={{
                        maxHeight: '416px', maxWidth: '742px', minHeight: '144px',
                    }} >
                        Camera is Off
                    </div>
                    :
                    <div className=" rounded-xl overflow-hidden self-center" >
                        <video ref={videoRef} className=" h-auto max-w-full rounded-xl overflow-hidden" />
                    </div>
                }
                <div className="flex flex-row self-center justify-center items-center py-4">
                    <ButtonGray
                        lable={audioPermession ?
                            <FaMicrophone size={30} />
                            :
                            <FaMicrophoneSlash size={30} className="text-red-800" />
                        }
                        onClick={() => { setaudioPermession(!audioPermession) }}
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
                <div className="flex flex-row py-4 lg:w-auto w-full self-center justify-center items-center">
                    <ButtonGray
                        lable="Cancel"
                        onClick={() => { }}
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