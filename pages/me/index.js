import { useState, useEffect, } from 'react';
import { RiVideoAddFill } from 'react-icons/ri'
import { BsCalendarFill, BsFillPlusSquareFill, BsThreeDots } from 'react-icons/bs';
import { SiGooglecalendar } from 'react-icons/si';
import { MdScreenShare } from 'react-icons/md';
import Image from 'next/image';
import moment from 'moment';
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useSession, signIn, signOut } from 'next-auth/client'
import { useRouter } from 'next/router';
import { scheduledMeets } from '../../data/scheduledMeetd'
import { connect } from 'react-redux';
import Modal from './../../components/Modal';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { nanoid } from 'nanoid';
import { ButtonColor, ButtonGray } from './../../components/buttons';
import { useWebsocket } from './../../services/socketService';

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

function Home(props) {
    const [session, loading] = useSession()
    const router = useRouter();

    const socket = useWebsocket()

    //state
    const [time, settime] = useState(new Date())
    const [isModalOpen, setIsModalOpen] = useState(false)
    //new meeting states
    const [meetingTitle, setmeetingTitle] = useState('');
    const [secureMetting, setsecureMetting] = useState(false)
    const [meetingId, setmeetingId] = useState(nanoid());
    const [meetPasscode, setMeetPasscode] = useState(nanoid(8));
    const [firstSessionCall, setfirstSessionCall] = useState(true)

    useEffect(() => {

        const currentTime = setInterval(() => {
            settime(new Date())
        }, 1000)

        return () => {
            clearInterval(currentTime);
        }

    }, [])

    useEffect(() => {
        if (session) {
            if (socket !== null) {
                socket.on('hello', () => {
                    console.log("Hello BETA MAZA A GAYA");
                })
            }
            setfirstSessionCall(false)
        }
    }, [session, loading])

    if (typeof window !== "undefined" && loading) return null;

    if (!session) {
        return (
            <>
            </>
        )
    }

    return (
        <>

            <div className="relative flex  flex-col overflow-y-scroll h-full md:overflow-y-hidden md:flex-row scrollbar-none">
                <div className="md:border-r lg:border-r border-gray-300 dark:border-gray-800 px-6 py-3 md:w-2/4 lg:w-2/5 lg:py-10 lg:px-12 md:py-10 md:px-12">
                    <div className="grid grid-flow-row w-full grid-cols-2 gap-3 md:gap-6">
                        <div key="sjdfbnas" className=" flex flex-col justify-between max-h-48 bg-appColor-newCardDark dark:bg-appColor-newCard rounded-xl shadow-lg p-3 md:p-5 transform transition duration-200 ease-in-out md:hover:scale-105 cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-newCardLight">
                                <RiVideoAddFill size={26} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">New Meeting</h1>
                                <p className="font-extralight text-xs">set up new meeting</p>
                            </div>
                        </div>
                        <div key="dgfhsf" className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCardDark dark:bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5 transform transition duration-200 ease-in-out md:hover:scale-105 cursor-pointer">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                                <BsFillPlusSquareFill size={20} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">Join Meeting</h1>
                                <p className="font-extralight text-xs">via invitation link</p>
                            </div>
                        </div>
                        <div key="kiuwfhmdstgt" className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCardDark dark:bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5 transform transition duration-200 ease-in-out md:hover:scale-105 cursor-pointer">
                            <div className="w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                                <SiGooglecalendar size={20} className=" self-center" />
                            </div>
                            <div className="mt-12">
                                <h1 className="font-bold text-sm ">Schedule</h1>
                                <p className="font-extralight text-xs">plan your meeting</p>
                            </div>
                        </div>
                        <div key="dfgsnjjqwr" className=" flex flex-col justify-between max-h-48 w-auto self-stretch  bg-appColor-otherCardDark dark:bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5 transform transition duration-200 ease-in-out md:hover:scale-105 cursor-pointer">
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
                            <div className="absolute flex top-3 right-4">
                                <h1 className=" font-bold lg:text-3xl text-xl self-end text-appColor-dark">{"Welcome, " + props.user.user.name}</h1>
                            </div>
                        </div>
                        <br />
                        {scheduledMeets.map((metting, index) => {
                            return (
                                <div key={index} className="relative flex flex-col p-4 md:p-5 rounded-xl bg-gray-300 dark:bg-appColor-appLight h-auto mb-3 shadow-md transform transition duration-200 md:hover:scale-105">
                                    <div className="flex flex-col ">
                                        <h1 className="text-lg md:text-xl lg:text-xl font-bold">{metting.meetName}</h1>
                                        <div className="flex flex-row text-appColor-caption">
                                            <AiOutlineClockCircle key="kmojsju" size={10} className="mr-1 text-xs self-center" />
                                            <p className=" text-xs">{metting.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:flex-row lg:justify-between ">
                                        <div className="mt-3 grid grid-flow-col w-min gap-1">
                                            {metting.members.length <= 3 ?
                                                metting.members.map((src, index) => {
                                                    return (
                                                        <div key={index} className="relative rounded-lg flex flex-nowrap overflow-hidden h-8 w-8 md:h-9 md:w-9 self-center shadow-sm">
                                                            <Image src={src} objectFit="cover" width={40} height={40} />
                                                        </div>
                                                    )
                                                })
                                                :
                                                metting.members.slice(0, 3).map((src, index) => {
                                                    if (index === 2) {
                                                        return (
                                                            <>
                                                                <div key={index} className="relative rounded-lg flex flex-nowrap overflow-hidden h-8 w-8 md:h-9 md:w-9  self-center shadow-sm">
                                                                    <Image src={src} objectFit="cover" width={40} height={40} />
                                                                </div>
                                                                <div className="relative rounded-lg flex flex-nowrap overflow-hidden h-8 w-8 md:h-9 md:w-9 self-center shadow-sm text-xs  bg-appColor-otherCard justify-center items-center">
                                                                    {`+${metting.members.length - 3}`}
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                    return (
                                                        <div key={index} className="relative rounded-lg flex flex-nowrap overflow-hidden h-8 w-8 md:h-9 md:w-9 self-center shadow-sm">
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
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setmeetingId(nanoid());
                    setmeetingTitle('');
                    setsecureMetting(false);
                    setMeetPasscode(nanoid(8))
                }}
                toggleModal={() => { setIsModalOpen(!isModalOpen) }}
                className="lg:h-4/5 lg:w-5/12 md:h-4/5 md:w-6/12"
            >
                <div className="flex flex-col w-full justify-between">
                    <div>
                        <div className="flex flex-row justify-center items-center pb-5 md:py-5 border-b border-gray-300 dark:border-gray-800 md:justify-start">
                            <BsCalendarFill className="text-lg" />
                            <p className="text-xl font-medium ml-3">New Meeting</p>
                        </div>
                        <div className="flex border-b border-gray-300 dark:border-gray-800">
                            <input
                                type="text"
                                value={meetingTitle}
                                onChange={(e) => setmeetingTitle(e.target.value)}
                                className="px-2 py-5 md:px-0 font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption w-full text-black dark:text-white bg-transparent border-0 outline-none focus:outline-none"
                                placeholder="Meeting title here"
                            />
                        </div>
                        <div className="flex flex-col border-b border-gray-300 dark:border-gray-800 py-5 ">
                            <p className="text-appColor-appLight dark:text-appColor-caption text-sm font-bold">Security Passcode</p>
                            <div className="flex flex-row mt-1 w-max cursor-pointer justify-center items-center" onClick={() => setsecureMetting(!secureMetting)}>
                                {secureMetting ?
                                    <ImCheckboxChecked size={16} className="text-appColor-otherCardDark" />
                                    :
                                    <ImCheckboxUnchecked size={16} className="text-appColor-appLight dark:text-appColor-caption" />
                                }
                                <p className="text-sm ml-3">Add a passcode</p>
                            </div>
                            {secureMetting &&
                                <div className="flex flex-row mt-3 ">
                                    <div className="p-2 rounded-xl bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                                        <input
                                            type="text"
                                            value={meetPasscode}
                                            onChange={(e) => setMeetPasscode(e.target.value)}
                                            className="ml-1 font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none"
                                            placeholder="passcode here"
                                        />
                                    </div>
                                    <button className="text-white bg-appColor-purple rounded-xl p-2 focus:outline-none outline-none text-xs font-bold md:text-sm px-3 w-min ml-3" onClick={() => navigator.clipboard.writeText(meetPasscode)}>
                                        Copy
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="flex flex-col py-5">
                            <p className="text-appColor-appLight dark:text-appColor-caption text-sm font-bold">Meeting ID</p>
                            <div className="flex flex-row mt-1 w-max justify-center items-center">
                                <div className=" bg-gray-400 dark:bg-appColor-appExtraLight rounded-xl p-2 focus:outline-none outline-none text-xs md:text-sm px-3 w-max">
                                    {meetingId}
                                </div>
                                <button className="text-white bg-appColor-purple rounded-xl p-2 focus:outline-none outline-none text-xs font-bold md:text-sm px-3 w-min ml-3" onClick={() => navigator.clipboard.writeText(meetingId)}>
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row pt-5 pb-2 md:justify-end items-center align-middle">
                        <ButtonGray lable="Cancel" className="mr-1 w-full md:w-max py-4 md:py-3" onClick={() => { setIsModalOpen(!isModalOpen) }} />
                        <ButtonColor lable="Save" className="ml-1 w-full md:w-max py-4 md:py-3" onClick={() => { router.push('/me/meeting/qdXHPpWAOY-WMLAZk7fPk') }} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

// export const getStaticProps = async (context) => {

//     const res = await fetch(`${process.env.NEXTAUTH_URL}/api/data/recentmeets`)
//     const data = await res.json()

//     if (!data) {
//         return {
//             props: {
//                 scheduledMeets: []
//             }
//         }
//     }

//     return {
//         props: {
//             scheduledMeets: data.data
//         }
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Home)