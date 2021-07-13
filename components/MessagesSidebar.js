import { useRef, useEffect, useState } from 'react'
import { BiChevronLeft, BiDotsVerticalRounded } from 'react-icons/bi'
import { HiEmojiHappy } from 'react-icons/hi'
import { MdSend } from 'react-icons/md'
import { connect } from 'react-redux';
import { useWebsocket } from './../services/socketService';
import moment from 'moment'
import { nanoid } from 'nanoid';
import { useTheme } from 'next-themes'
import { BeatLoader } from 'react-spinners'
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { Picker } from 'emoji-mart'

// import { IEmojiPickerProps } from 'emoji-picker-react'
// import dynamic from "next/dynamic";

// const EmojiPickerNoSSRWrapper = dynamic < IEmojiPickerProps > (() => import('emoji-picker-react'), {
//     ssr: false,
// })

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {

    }
}

const ParticipantSingleView = (props) => {

    const [dotsIndiactorOpacity, setdotsIndiactorOpacity] = useState(false)

    return (
        <div className="relative flex flex-row w-full py-2 px-2 bg-gray-200 dark:bg-appColor-appLight rounded-xl mb-3 overflow-hidden" onMouseEnter={() => setdotsIndiactorOpacity(true)} onMouseLeave={() => setdotsIndiactorOpacity(false)}>
            <div className="pr-2 flex justify-center items-center w-max">
                <div className="relative w-10 h-10 flex align-middle justify-center rounded-full bg-appColor-iconColor self-center overflow-hidden">
                    {props.data.picture == "" ?
                        <FaUser className="self-center text-xl " />
                        :
                        <Image src={props.data.picture} objectFit="cover" layout="fill" className="rounded-full" />
                    }
                </div>
            </div>
            <div className="flex w-full items-center">
                <p className="text-base line-clamp-1" >{props.socketId == props.data.socketId ? "You" : props.data.name}</p>
            </div>
            <div className="absolute z-10 top-0 bottom-0 right-0 flex justify-center items-center p-2 ">
                <div className={`p-1 bg-gray-300 dark:bg-appColor-appExtraLight rounded-lg shadow-md ${dotsIndiactorOpacity ? "opacity-100 translate-x-0 " : "opacity-0 translate-x-full"} transform transition duration-300 ease-in-out cursor-pointer`}>
                    <BiDotsVerticalRounded size={23} />
                </div>
            </div>
        </div>
    )
}

const MessageYou = (props) => {
    return (
        <div className="flex flex-col w-full mb-3">
            <div className="flex flex-row justify-between items-center">
                <p style={{ fontSize: 10 }} className=" self-center  text-appColor-caption ">{moment(props.time).format('hh:mm a')}</p>
                <p className="text-sm text-appColor-caption">You</p>
            </div>
            <div style={{ maxWidth: '80%' }} className=" self-end flex p-2 mt-1 bg-appColor-otherCard rounded-xl">
                <p className="text-sm text-white">{props.message}</p>
            </div>
        </div>
    )
}

const MessageOthers = (props) => {
    return (
        <div className="flex flex-col w-full mb-3">
            <div className="flex flex-row justify-between items-center">
                <p className=" text-xs text-appColor-caption">{props.name}</p>
                <p style={{ fontSize: 10 }} className=" self-center  text-appColor-caption ">{moment(props.time).format('hh:mm a')}</p>
            </div>
            <div style={{ maxWidth: '80%' }} className=" self-start flex p-2 mt-1 dark:bg-appColor-appLight bg-gray-200 border-0 dark:border dark:border-appColor-appExtraLight border-gray-300 rounded-xl">
                <p className="text-sm">{props.message}</p>
            </div>
        </div>
    )
}

const MessagesSidebar = (props) => {

    const { theme, setTheme } = useTheme()
    const socket = useWebsocket()

    //refs
    const messagesDiv = useRef(null)

    //states
    const [messages, setmessages] = useState([]);
    const [messagesView, setmessagesView] = useState(true);
    const [newMessage, setnewMessage] = useState('')
    const [showEmoji, setshowEmoji] = useState(false)

    //lifecycle
    useEffect(() => {
        if (messagesDiv.current !== null) {
            messagesDiv.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            })
        }


        socket.on('new-message', data => {
            // console.log('new message', data);
            setmessages(messagescurrent => [...messagescurrent, data.data])
        })
    }, [])

    //methods

    const toggleMessagesAndParticipants = () => {
        setmessagesView(!messagesView)
    }

    const addMessage = () => {
        if (newMessage.trim().length === 0) {
            return;
        }
        const data = {
            id: nanoid(),
            userId: props.user.user._id,
            name: props.user.user.name,
            createdAt: new Date(),
            message: newMessage,
        }

        socket.emit('add-message', { meetingId: props.meetingId, data: data });

        // setmessages([...messages, data]);
        setnewMessage('')
    }

    //views

    return (
        <header className={` z-30 md:border-l bg-appColor-light dark:bg-appColor-dark border-gray-300 dark:border-gray-800 w-full md:w-96 h-screen justify-between absolute md:relative flex flex-col ease-in-out duration-200 inset-y-0 transform transition ${props.isMessagesOpen ? "translate-x-0 flex" : "translate-x-full hidden"}  shadow-sm md:shadow-none`}>
            <div className="flex flex-col w-full h-full relative">
                <header className="flex top-0 right-4 left-4 px-4 ">
                    <div className="flex flex-row w-full border-b border-gray-300 dark:border-gray-800 h-16 py-2 justify-center items-center ">
                        <div onClick={props.closeMessages} className="md:hidden w-min flex justify-center items-center p-1 mr-2 rounded-full dark:bg-appColor-appLight bg-gray-300 cursor-pointer">
                            <BiChevronLeft size={30} />
                        </div>
                        <div style={{ padding: '2px', height: 'min-content' }} className="flex flex-row w-full dark:bg-appColor-appLight bg-gray-300 items-center rounded-xl">
                            <div onClick={toggleMessagesAndParticipants} className={`flex w-full rounded-xl justify-center items-center py-2 cursor-pointer ${messagesView ? "dark:bg-appColor-dark bg-appColor-light" : "bg-transparent"}`}>
                                <p className=" font-bold text-xs">Messages</p>
                            </div>
                            <div onClick={toggleMessagesAndParticipants} className={`flex w-full rounded-xl justify-center items-center py-2 cursor-pointer ${!messagesView ? "dark:bg-appColor-dark bg-appColor-light" : "bg-transparent"}`}>
                                <p className=" font-bold text-xs">Participants</p>
                            </div>
                        </div>
                    </div>
                </header>
                {messagesView ?
                    <>
                        <div ref={messagesDiv} className=" select-text relative flex flex-col h-full w-full px-2 py-3 overflow-y-scroll scrollDiv">
                            {messages.map((data, index) => {
                                if (data.userId === props.user.user._id) {
                                    return <MessageYou key={index.toString()} name={data.name} time={data.createdAt} message={data.message} />
                                }
                                return <MessageOthers key={index.toString()} name={data.name} time={data.createdAt} message={data.message} />
                            })}

                        </div>
                        <footer style={{ height: "83px" }} className="flex items-center flex-row bottom-0 right-0 left-0 p-1 border-t  border-gray-300 dark:border-gray-800 ">
                            <div onClick={() => setshowEmoji(!showEmoji)} className="p-1 rounded-full cursor-pointer" >
                                <HiEmojiHappy size={25} />
                            </div>
                            {showEmoji && <Picker
                                style={{ position: "absolute", bottom: '82px', left: 5, backgroundColor: theme == "dark" ? "#242736" : "#e8e8e8", borderColor: theme == "dark" ? "#242736" : "#e8e8e8" }}
                                showSkinTones={false}
                                showPreview={false}
                                color="#0e78f9"
                                darkMode={theme == "dark"}
                                perLine={6}
                                onSelect={(e) => { setnewMessage(mes => mes + e.native) }}
                                native={true}
                            />}
                            <input
                                id="message"
                                type="text"
                                value={newMessage}
                                onChange={e => {
                                    setnewMessage(e.target.value)
                                }}
                                className="flex appearance-none w-full h-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-transparent border-0 outline-none focus:outline-none"
                                placeholder="Type to write a message"
                                onKeyUp={e => { if (e.key == "Enter" || e.keyCode == 13) { addMessage() } }}
                            />
                            <div onClick={addMessage} className="p-2 rounded-full cursor-pointer bg-appColor-otherCard">
                                <MdSend size={25} />
                            </div>
                        </footer>
                    </>
                    :
                    <div className="flex flex-col h-full w-full overflow-y-scroll scrollDiv px-2 py-3 ">
                        {props.participantsList.length == 0 ?
                            <div className="flex w-full h-full justify-center items-center">
                                <BeatLoader size={15} margin={2} color={theme == "dark" ? "#fff" : "#62646f"} />
                            </div>
                            :
                            props.participantsList.map((participant, index) => {
                                return <ParticipantSingleView socketId={props.user.socketId} key={index.toString()} data={participant} />
                            })

                        }
                    </div>
                }
            </div>
        </header>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesSidebar);