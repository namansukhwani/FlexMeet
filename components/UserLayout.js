import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import SideBar from './SideBar';
import { useMediaQuery } from '@react-hook/media-query'
import ProfileModal from './profileModal';
import { useSession } from 'next-auth/client';
import HashLoader from 'react-spinners/HashLoader'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import { fetchUser } from '../redux/slices/userSlice';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: token => dispatch(fetchUser(token)),
    }
}

function UserLayout(props) {

    const router = useRouter();
    const [session, loading] = useSession()
    const { theme, setTheme } = useTheme()
    const matchsSM = useMediaQuery('(min-width: 640px)')

    //states
    const [isSidebarOpen, setisSidebarOpen] = useState(false);
    const [isModalOpen, setisModalOpen] = useState(false)
    const [firstSessionCall, setfirstSessionCall] = useState(true)

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
        if (session && !loading && firstSessionCall) {
            props.fetchUser(session.accessToken);
            connectToSocketIo();
            setfirstSessionCall(false)
        }
        // console.log("session loading", loading);
        // if (session) console.log("access Token", session.accessToken);
        if (!session && !loading) router.replace('/', undefined, { shallow: true })
    }, [session, loading])

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

    const connectToSocketIo = () => {
        const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
            extraHeaders: {
                Authorization: "Bearer " + session.accessToken,
            }
        })

        socket.on('hello', socket => {
            console.log(socket);
            createToast(`Welcome ${props.user.user.name}`);
        })

        socket.on('connect', () => {
            console.log("Sucessfully connected to WSS server");
            console.log(socket.id);
            createToast("Realtime connection Sucessful with FlexMeet Server");
        })
    }

    //views

    if (!session && props.user.isLoading) {
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
            <SideBar isSidebarOpen={isSidebarOpen} closeSidebarMobile={() => setisSidebarOpen(false)} openSidebarMobile={() => { setisSidebarOpen(!isSidebarOpen); }} />
            {/* {isModalOpen && <ProfileModal closeModal={() => setisModalOpen(false)} />} */}
            <main className=" relative h-screen w-full pt-16">
                {isSidebarOpen && <div className=" z-20 absolute top-0 bottom-0 right-0 left-0 inset-0 bg-gray-500 bg-opacity-30 transition-opacity md:hidden" onClick={() => { setisSidebarOpen(!isSidebarOpen); }} />}
                <Header openModal={() => setisModalOpen(!isModalOpen)} openSidebarMobile={() => { setisSidebarOpen(!isSidebarOpen); }} />
                {props.children}
            </main>
        </>


    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);