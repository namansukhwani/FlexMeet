import { useState } from 'react'
import { FaMicrophoneSlash, FaMicrophone, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { ButtonGray, ButtonColor, ButtonRed, ButtonSetColor } from './buttons';
import { HiUserGroup, HiPhoneMissedCall } from 'react-icons/hi'
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { BiMessageSquareDots, BiChevronUp, BiChevronRight, BiChevronLeft, BiChevronDown } from 'react-icons/bi'

const FooterMeeting = (props) => {

    const [openMore, setopenMore] = useState(false);

    return (
        <footer className="absolute bottom-0 left-0 right-0  p-3 md:p-3 z-10 md:border-t bg-appColor-light dark:bg-appColor-dark border-gray-300 dark:border-gray-800  shadow-sm md:shadow-none">
            <div className="md:flex hidden flex-row justify-between align-middle">
                <ButtonGray
                    lable={props.audioPermession ?
                        <FaMicrophone size={25} />
                        :
                        <FaMicrophoneSlash size={25} className="text-red-800" />
                    }
                    onClick={() => { props.toggleAudio(); }}
                    className="flex justify-center items-center mr-3 px-6"
                />
                <ButtonGray
                    lable={props.cameraPermession ?
                        <FaVideo size={25} />
                        :
                        <FaVideoSlash size={25} className="text-red-800" />
                    }
                    onClick={() => { props.toggleVideo() }}
                    className="flex justify-center items-center px-6"
                />

                <ButtonRed
                    lable={
                        <div className="flex flex-row justify-center items-center ">
                            <HiPhoneMissedCall size={20} className="text-white" />
                            <p className="font-bold ml-1 md:flex hidden line-clamp-1 text-white" >End Call</p>
                        </div>
                    }
                    onClick={() => { }}
                    className="flex justify-center items-center ml-3 px-6 "
                />
                <ButtonGray
                    lable={
                        <div className="flex flex-row justify-center items-center ">
                            <HiUserGroup className="self-center" size={25} />
                            <BiChevronUp className="ml-1" size={15} />
                        </div>

                    }
                    onClick={() => { }}
                    className="flex justify-center items-center ml-3 px-6 "
                />
                <ButtonSetColor
                    lable={
                        <div className="flex flex-row justify-center items-center">
                            <BiMessageSquareDots className="self-center" size={25} />
                            {props.isMessagesOpen ?
                                <BiChevronRight className="ml-1" size={15} />
                                :
                                <BiChevronUp className="ml-1" size={15} />
                            }
                        </div>

                    }
                    onClick={() => { props.toggleMessages() }}
                    className={`flex justify-center items-center ml-3 px-6 ${props.isMessagesOpen ? " bg-appColor-otherCard" : "bg-gray-300 dark:bg-appColor-appLight"}`}
                />
            </div>
            <div className="flex md:hidden flex-col">
                <div className="flex flex-row justify-between align-middle">
                    <ButtonGray
                        lable={props.audioPermession ?
                            <FaMicrophone size={25} />
                            :
                            <FaMicrophoneSlash size={25} className="text-red-800" />
                        }
                        onClick={() => { props.toggleAudio(); }}
                        className="flex justify-center items-center mr-3 px-6"
                    />
                    <ButtonGray
                        lable={props.cameraPermession ?
                            <FaVideo size={25} />
                            :
                            <FaVideoSlash size={25} className="text-red-800" />
                        }
                        onClick={() => { props.toggleVideo() }}
                        className="flex justify-center items-center px-6"
                    />
                    <ButtonGray
                        lable={openMore ?
                            <BiChevronDown size={25} />
                            :
                            <BiChevronUp size={25} />
                        }
                        onClick={() => { setopenMore(!openMore) }}
                        className="flex rounded-full w-max  justify-center items-center p-0 ml-2 "
                    />
                </div>
                <div className={`${openMore ? "-translate-y-0 " : " hidden "} flex transform transition ease-in-out duration-300 delay-75 mt-3 flex-row justify-between align-middle`}>
                    <ButtonGray
                        lable={
                            <div className="flex flex-row justify-center items-center ">
                                <BiMessageSquareDots className="self-center" size={25} />
                                <BiChevronUp className="ml-1" size={15} />
                            </div>

                        }
                        onClick={() => { props.toggleMessages() }}
                        className="flex justify-center items-center px-6 "
                    />
                    <ButtonGray
                        lable={
                            <div className="flex flex-row justify-center items-center ">
                                <HiUserGroup className="self-center" size={25} />
                                <BiChevronUp className="ml-1" size={15} />
                            </div>

                        }
                        onClick={() => { }}
                        className="flex justify-center items-center ml-3 px-6 "
                    />
                    <ButtonRed
                        lable={
                            <div className="flex flex-row justify-center items-center ">
                                <HiPhoneMissedCall size={20} className="text-white" />
                                <p className="font-bold ml-1 md:block hidden text-white" >End Call</p>
                            </div>
                        }
                        onClick={() => { }}
                        className="flex justify-center items-center ml-3 px-6 "
                    />
                </div>
            </div>
        </footer>
    )
}

export default FooterMeeting;