import { useState, useEffect } from 'react';
import { RiVideoAddFill } from 'react-icons/ri'
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { SiGooglecalendar } from 'react-icons/si';
import { MdScreenShare } from 'react-icons/md';
import Image from 'next/image';
import moment from 'moment';

export default function Home() {

    //state
    const [time, settime] = useState(new Date())

    useEffect(() => {
        const currentTime = setInterval(() => {
            settime(new Date())
        }, 1000)
        return () => {
            clearInterval(currentTime);
        }
    }, [])

    return (
        <>

            <div className="relative flex  flex-col overflow-y-scroll h-full md:overflow-y-hidden md:flex-row scrollbar-none">
                <div className="md:border-r lg:border-r border-gray-800 px-6 py-3 md:w-2/4 lg:w-2/5 lg:py-10 lg:px-12 md:py-10 md:px-12">
                    <div className="grid grid-flow-row w-full grid-cols-2 gap-3 md:gap-6">
                        <div className=" flex flex-col justify-between max-h-48 bg-appColor-newCard rounded-xl shadow-lg p-3 md:p-5">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-newCardLight">
                                <RiVideoAddFill size={26} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">New Meeting</h1>
                                <p className="font-extralight text-xs">set up new meeting</p>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                                <BsFillPlusSquareFill size={20} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">Join Meeting</h1>
                                <p className="font-extralight text-xs">via invitation link</p>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                                <SiGooglecalendar size={20} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">Schedule</h1>
                                <p className="font-extralight text-xs">plan your meeting</p>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                                <MdScreenShare size={20} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">Share Screen</h1>
                                <p className="font-extralight text-xs">show your work</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:w-2/4 lg:w-3/5 px-6 py-3 md:py-0 lg:py-0  lg:px-6 md:px-6  ">
                    <div className="md:overflow-y-scroll scrollDiv lg:px-6 md:px-6">
                        <div className=" relative rounded-xl flex flex-nowrap overflow-hidden max-h-40 md:h-44 lg:h-60 md:mt-10 shadow-lg">
                            <Image src='/images/meetClock.jpg' objectFit="cover" width={777} height={400} />
                            <div className="absolute flex flex-col bottom-4 right-4">
                                <h1 className="font-bold md:text-5xl text-4xl self-end text-appColor-dark">{moment(time).format('hh:mm')}</h1>
                                <p className="self-end text-xs md:text-sm text-appColor-dark">{moment(time).format('dddd, Do MMM YYYY')}</p>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </>
    )
}
