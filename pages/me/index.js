import { useState, useEffect } from 'react';
import { RiVideoAddFill } from 'react-icons/ri'
import { BsFillPlusSquareFill, BsThreeDots } from 'react-icons/bs';
import { SiGooglecalendar } from 'react-icons/si';
import { MdScreenShare } from 'react-icons/md';
import Image from 'next/image';
import moment from 'moment';
import { AiOutlineClockCircle } from 'react-icons/ai'
import { scheduledMeets } from '../../data/scheduledMeetd'

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
                <div className="md:border-r lg:border-r border-gray-300 dark:border-gray-800 px-6 py-3 md:w-2/4 lg:w-2/5 lg:py-10 lg:px-12 md:py-10 md:px-12">
                    <div className="grid grid-flow-row w-full grid-cols-2 gap-3 md:gap-6">
                        <div className=" flex flex-col justify-between max-h-48 bg-appColor-newCardDark dark:bg-appColor-newCard rounded-xl shadow-lg p-3 md:p-5 transform transition duration-200 ease-in-out md:hover:scale-105">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-newCardLight">
                                <RiVideoAddFill size={26} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">New Meeting</h1>
                                <p className="font-extralight text-xs">set up new meeting</p>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCardDark dark:bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5 transform transition duration-200 ease-in-out md:hover:scale-105">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                                <BsFillPlusSquareFill size={20} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">Join Meeting</h1>
                                <p className="font-extralight text-xs">via invitation link</p>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCardDark dark:bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5 transform transition duration-200 ease-in-out md:hover:scale-105">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                                <SiGooglecalendar size={20} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">Schedule</h1>
                                <p className="font-extralight text-xs">plan your meeting</p>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCardDark dark:bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5 transform transition duration-200 ease-in-out md:hover:scale-105">
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
                        <div className=" relative rounded-xl flex flex-nowrap overflow-hidden max-h-40 md:h-44 lg:h-60 md:mt-10 shadow-lg transform transition duration-200 ease-in-out md:hover:-skew-x-2 md:hover:skew-y-4">
                            <Image src='/images/meetClock.jpg' objectFit="cover" width={777} height={400} />
                            <div className="absolute flex flex-col bottom-4 right-4">
                                <h1 className="font-bold md:text-5xl text-4xl self-end text-appColor-dark">{moment(time).format('hh:mm')}</h1>
                                <p className="self-end text-xs md:text-sm text-appColor-dark">{moment(time).format('dddd, Do MMM YYYY')}</p>
                            </div>
                        </div>
                        <br />
                        {scheduledMeets.map((metting, index) => {
                            return (
                                <div key={index.toString()} className="relative flex flex-col p-4 md:p-5 rounded-xl bg-gray-300 dark:bg-appColor-appLight h-auto mb-3 shadow-md transform transition duration-200 md:hover:scale-105">
                                    <div className="flex flex-col ">
                                        <h1 className="text-lg md:text-xl lg:text-xl font-bold">{metting.meetName}</h1>
                                        <div className="flex flex-row text-appColor-caption">
                                            <AiOutlineClockCircle size={10} className="mr-1 text-xs self-center" />
                                            <p className=" text-xs">{metting.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row lg:justify-between ">
                                        <div className="mt-3 grid grid-flow-col w-min gap-1">
                                            {metting.members.length <= 3 ?
                                                metting.members.map((src, index) => {
                                                    return (
                                                        <div key={index.toString()} className="relative rounded-lg flex flex-nowrap overflow-hidden h-8 w-8 md:h-9 md:w-9 self-center shadow-sm">
                                                            <Image src={src} objectFit="cover" width={40} height={40} />
                                                        </div>
                                                    )
                                                })
                                                :
                                                metting.members.slice(0, 3).map((src, index) => {
                                                    if (index === 2) {
                                                        return (
                                                            <>
                                                                <div key={index.toString()} className="relative rounded-lg flex flex-nowrap overflow-hidden h-8 w-8 md:h-9 md:w-9  self-center shadow-sm">
                                                                    <Image src={src} objectFit="cover" width={40} height={40} />
                                                                </div>
                                                                <div className="relative rounded-lg flex flex-nowrap overflow-hidden h-8 w-8 md:h-9 md:w-9 self-center shadow-sm text-xs  bg-appColor-otherCard justify-center items-center">
                                                                    {`+${metting.members.length - 3}`}
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                    return (
                                                        <div key={index.toString()} className="relative rounded-lg flex flex-nowrap overflow-hidden h-8 w-8 md:h-9 md:w-9 self-center shadow-sm">
                                                            <Image src={src} objectFit="cover" width={40} height={40} />
                                                        </div>
                                                    )

                                                })

                                            }
                                        </div>
                                        <div className="flex flex-row-reverse mt-4">
                                            <button type="button" className="bg-appColor-otherCard rounded-xl p-2 focus:outline-none outline-none text-sm md:text-base px-3">
                                                Start
                                            </button>
                                            <div className=" bg-gray-400 dark:bg-appColor-appExtraLight rounded-xl p-2 focus:outline-none outline-none text-xs md:text-sm px-3 mr-2">
                                                {metting.id}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="z-10 absolute top-4 right-4 md:right-5 md:top-5 bg-gray-400 w-min p-1 rounded-xl dark:bg-appColor-appExtraLight">
                                        <BsThreeDots size={25} />
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
