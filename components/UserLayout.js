import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import SideBar from './SideBar';
import { useMediaQuery } from '@react-hook/media-query'

function UserLayout(props) {

    const matchsSM = useMediaQuery('(min-width: 640px)')

    //states
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    //lifecycles
    useEffect(() => {
        // console.log("Matches", matchsSM);
        if (!matchsSM) {
            setisSidebarOpen(false);
            // console.log(isSidebarOpen);
        }
    }, [matchsSM])

    return (
        <>
            <Head>
                <title>FlexMeet</title>
            </Head>
            <SideBar isSidebarOpen={isSidebarOpen} openSidebarMobile={() => { setisSidebarOpen(!isSidebarOpen); }} />
            <main className="w-screen">
                {isSidebarOpen && <div className=" z-20 absolute top-0 bottom-0 right-0 left-0 inset-0 bg-gray-500 bg-opacity-30 transition-opacity md:hidden" onClick={() => { setisSidebarOpen(!isSidebarOpen); }} />}
                <Header openSidebarMobile={() => { setisSidebarOpen(!isSidebarOpen); }} />
                {props.children}
            </main>

        </ >
    )
}

export default UserLayout;