import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Hark from "hark";
import { FaMicrophoneSlash, FaMicrophone, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import Image from 'next/image';

const VideoView = (props) => {
    //refs
    const mainDiv = useRef(null);
    const videoRef = useRef(null)
    //state
    const [divHeight, setdivHeight] = useState(150);
    const [divWidth, setdivWidth] = useState(220);
    const [hark, sethark] = useState(null);
    const [audioVolume, setaudioVolume] = useState(0);
    const [pinIndicatorOpacity, setpinIndicatorOpacity] = useState(false);

    // console.log(props.video.stream)
    //lifecycle

    useEffect(() => {
        const stream = props.video.stream;
        try {
            videoRef.current.srcObject = stream;
        }
        catch (e) {
            console.log(e);
        }
        videoRef.current.play()
        if (props.myId === props.video.id) {
            videoRef.current.muted = true;
        }
        console.log("ID  :", props.video.id, stream.getAudioTracks());
        if (stream.getAudioTracks()[0].enabled) {
            startHark(props.video.stream);
        }

    }, [])

    useEffect(() => {
        if (!props.video.stream.getAudioTracks()[0].enabled) {
            if (hark) {
                hark.stop();
                setaudioVolume(0)
            }
        }
        else {
            if (!hark) {
                startHark(props.video.stream)
            }
        }
    }, [props.video.stream.getAudioTracks()[0].enabled])

    useEffect(() => {
        // console.log("effect");
        // console.log(props.parentDiv);
        var max = 0;
        let i = 1;
        while (i < 5000) {
            let w = area(i, props.totalLength, props.parentDiv.width, props.parentDiv.height, 2);
            if (w === false) {
                max = i - 1;
                break;
            }
            i++;
        }

        max = max - 4;
        setdivWidth(max - 4);
        setdivHeight((max - 4) * 0.75);
    }, [props.parentDiv.width, props.parentDiv.height, props.totalLength])

    //methods
    const area = (Increment, Count, Width, Height, Margin = 10) => {
        let i = 0, w = 0;
        let h = Increment * 0.75 + (Margin * 2);
        while (i < (Count)) {
            if ((w + Increment) > Width) {
                w = 0;
                h = h + (Increment * 0.75) + (Margin * 2);
            }
            w = w + Increment + (Margin * 2);
            i++;
        }
        if (h > Height) return false;
        else return Increment;
    }

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

    //views
    return (
        <div key={props.index.toString()} ref={mainDiv} style={{ width: divWidth, height: divHeight, margin: 4 }} className={`relative inline-block bg-gray-300 dark:bg-appColor-appLight rounded-xl justify-center items-center shadow-md m-2 border-appColor-otherCard ${false ? "border-4" : "border-0"}`} onMouseEnter={() => setpinIndicatorOpacity(true)} onMouseLeave={() => setpinIndicatorOpacity(false)}>
            <video ref={videoRef} className={`z-10 h-full w-full rounded-xl object-cover ${props.video.stream.getVideoTracks()[0].enabled ? "block" : " hidden"}`} />
            {props.video.stream.getAudioTracks()[0].enabled ?
                <div className="absolute z-20 flex flex-row justify-evenly items-center bottom-2 left-2 p-1 w-8 h-8 rounded-full dark:bg-appColor-dark bg-appColor-light shadow-lg">
                    <div className={` bg-appColor-otherCardDark p-1 rounded-full barsmallLevel${audioVolume}`} />
                    <div className={` bg-appColor-otherCardDark p-1 rounded-full barlevel${audioVolume}`} />
                    <div className={` bg-appColor-otherCardDark p-1 rounded-full barsmallLevel${audioVolume}`} />
                </div>
                :
                <div className="absolute z-20 flex flex-row justify-evenly items-center bottom-2 left-2 p-1 w-8 h-8 rounded-full dark:bg-appColor-dark bg-appColor-light shadow-lg">
                    <FaMicrophoneSlash size={18} />
                </div>
            }
            <div className={`w-full h-full flex-col justify-center items-center ${props.video.stream.getVideoTracks()[0].enabled ? "hidden" : "flex"}`}>
                <div className=" w-14 h-14 lg:w-16 lg:h-16 relative flex items-center bg-gray-200 dark:bg-appColor-appLight justify-center rounded-full border-2 dark:border-appColor-appExtraLight border-gray-400 shadow-lg">
                    {false ?
                        <FaUser className="self-center text-xl md:text-xl " />
                        :
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ3nGxIOI1jzv9POKQz5UKtX_eKLt2sTD5Bw&usqp=CAU" className="rounded-full" objectFit="cover" layout="fill" />
                    }
                </div>
                <p className=" text-sm lg:text-base line-clamp-1 mt-1 w-4/5 self-center text-center">Jeff Ambroos</p>
            </div>
            <div className={`absolute z-20 flex flex-row justify-evenly items-center right-2 top-2 p-1 w-10 h-10 rounded-full dark:bg-appColor-dark bg-appColor-light shadow-lg cursor-pointer ${pinIndicatorOpacity ? " opacity-80" : "opacity-0"} transition duration-150 ease-in-out `}>
                <AiOutlinePushpin size={18} />
            </div>
        </div>
    )
}

export default VideoView