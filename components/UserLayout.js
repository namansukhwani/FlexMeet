import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from './Header';
import SideBar from './SideBar';
import { useMediaQuery } from '@react-hook/media-query'
import ProfileModal from './profileModal';
import { useSession, signOut } from 'next-auth/client';
import HashLoader from 'react-spinners/HashLoader'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import { fetchUser, logoutUser } from '../redux/slices/userSlice';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import ProfileDropdownMenu from './ProfileDropdownMenu'
import { useDetectOutsideClick } from './../hooks/useDetectOustsideClick';

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: token => dispatch(fetchUser(token)),
        logoutUser: () => dispatch(logoutUser()),
    }
}

function UserLayout(props) {

    const router = useRouter();
    const [session, loading] = useSession()
    const { theme, setTheme } = useTheme()
    const matchsSM = useMediaQuery('(min-width: 640px)')

    //refs
    const profileMenuRef = useRef(null);

    //states
    const [isSidebarOpen, setisSidebarOpen] = useState(false);
    const [isModalOpen, setisModalOpen] = useState(false)
    const [firstSessionCall, setfirstSessionCall] = useState(true)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useDetectOutsideClick(profileMenuRef, false);

    //lifecycles

    useEffect(() => {
        // console.log("Matches", matchsSM);
        if (!matchsSM) {
            setisSidebarOpen(false);
            // console.log(isSidebarOpen);
        }
    }, [matchsSM])

    useEffect(() => {
        // console.log("change session", session);
        if (session && firstSessionCall) {
            // console.log("HELLO BHAI CHAL JA YRR");
            props.fetchUser(session.accessToken);
            connectToSocketIo();
            setfirstSessionCall(false)
        }
        // console.log("session loading", loading);
        // if (session) console.log("access Token", session.accessToken);
        if (!session && !loading) router.replace('/', undefined, { shallow: true })
    }, [session, loading])

    useEffect(() => {
        const err = props.user.err
        if (err) {
            if (typeof err === "string" || err instanceof String) {
                createToast(err);
            }
            else {
                if (err instanceof Error) {
                    createToast(err.message)
                }
                else {
                    try {
                        createToast(err.err)
                    }
                    catch (e) {
                        createToast(JSON.stringify(err))
                    }

                }
            }
        }
    }, [props.user.err])

    //methods

    const logOut = () => {
        signOut();
        props.logoutUser()
    }

    const startHark = () => {

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

    const connectToSocketIo = () => {
        const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
            extraHeaders: {
                Authorization: "Bearer " + session.accessToken,
            }
        })

        socket.on('hello', socket => {
            console.log(socket);
            // createToast(`Welcome ${props.user.user.name}`);
        })

        socket.on('connect', () => {
            console.log("Sucessfully connected to WSS server");
            console.log(socket.id);
            // createToast("Realtime connection Sucessful with FlexMeet Server");
        })
    }

    //views

    if (!session || props.user.isLoading) {
        return (
            <div className="relative h-screen w-full flex justify-center items-center">
                <HashLoader size={!matchsSM ? 60 : 100} color={theme == "dark" ? "#fff" : "#62646f"} />
            </div>
        )
    }

    return (

        <>
            <Head>
                <title>FlexMeet</title>
            </Head>
            {!router.pathname.startsWith('/me/meeting') && <SideBar isSidebarOpen={isSidebarOpen} closeSidebarMobile={() => setisSidebarOpen(false)} openSidebarMobile={() => { setisSidebarOpen(!isSidebarOpen); }} />}
            {/* {isModalOpen && <ProfileModal closeModal={() => setisModalOpen(false)} />} */}
            <main className={` relative h-screen w-full ${!router.pathname.startsWith('/me/meeting') && "pt-20"}`}>
                {isSidebarOpen && <div className=" z-20 absolute top-0 bottom-0 right-0 left-0 inset-0 bg-gray-500 bg-opacity-30 transition-opacity md:hidden" onClick={() => { setisSidebarOpen(!isSidebarOpen); }} />}
                {!router.pathname.startsWith('/me/meeting') && <Header openModal={() => setisModalOpen(!isModalOpen)} openSidebarMobile={() => { setisSidebarOpen(!isSidebarOpen); }} toggleProfileMenu={() => { setIsProfileMenuOpen(!isProfileMenuOpen) }} />}
                <ProfileDropdownMenu refVar={profileMenuRef} isOpen={isProfileMenuOpen} logout={() => logOut()} closeMenu={() => { setIsProfileMenuOpen(false) }} />
                {props.children}
            </main>
        </>


    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);