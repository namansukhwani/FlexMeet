import { AiOutlineClockCircle, AiFillSetting } from 'react-icons/ai'
import { BsCameraVideoFill } from 'react-icons/bs';
import { BiHome, BiMessageSquareDetail, BiArrowBack } from 'react-icons/bi';
import { TiContacts } from 'react-icons/ti';
import Link from 'next/link';
import { useRouter } from 'next/router';

// duration-200 inset-y-0 transform -translate-x-full transition
function SideBar(props) {

    const router = useRouter();

    const isActive = (route) => {
        if (route == router.pathname) {
            return true
        }
        return false
    }

    return (
        <>
            <header className={` z-30 md:border-r bg-appColor-light dark:bg-appColor-dark border-gray-300 dark:border-gray-800 h-screen p-4 justify-between absolute md:relative flex flex-col ease-in-out duration-200 inset-y-0 transform transition ${props.isSidebarOpen ? "-translate-x-0" : "-translate-x-full"} md:-translate-x-0 shadow-sm md:shadow-none`}>
                <div className="self-start flex flex-row w-full align-middle justify-between">
                    <div className="self-start flex flex-col">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex align-middle justify-center rounded-xl" style={{ backgroundImage: 'linear-gradient(to right top, #008793, #0d81ad, #5d75b5, #9663a2, #b75279)' }}>
                            <BsCameraVideoFill size={30} className=" self-center" />
                        </div>
                        <p className=" text-xs mt-1 text-gray-500 self-center">FlexMeet</p>
                    </div>
                    <div className="float-right block md:hidden">
                        <BiArrowBack size={30} className=" self-center" onClick={() => props.openSidebarMobile()} />
                    </div>
                </div>
                <div className=" self-start">
                    <Link href="/me">
                        <div className={`relative mb-3 w-auto px-4 h-10 md:px-0 md:w-12 md:h-12 flex flex-row align-middle justify-start md:justify-center rounded-xl ${isActive('/me') ? "bg-gray-300 dark:bg-appColor-selectd" : "hover:bg-gray-300 dark:hover:bg-appColor-selectd"} `} onClick={() => props.closeSidebarMobile()}>
                            <BiHome size={25} className=" self-center" />
                            {isActive('/me') && <div className=" absolute bottom-0 self-center w-4/5 md:w-5 h-1 bg-black dark:bg-white" />}
                            <p className=" font-bold text-lg ml-3 self-center block md:hidden">Home</p>
                        </div>
                    </Link>
                    <Link href="/me/messages">
                        <div className={`relative mb-3 w-auto px-4 h-10 md:px-0 md:w-12 md:h-12 flex flex-row align-middle justify-start md:justify-center rounded-xl ${isActive('/me/messages') ? "bg-gray-300 dark:bg-appColor-selectd" : "hover:bg-gray-300 dark:hover:bg-appColor-selectd"} `} onClick={() => props.closeSidebarMobile()}>
                            <BiMessageSquareDetail size={25} className=" self-center" />
                            {isActive('/me/messages') && <div className=" absolute bottom-0 self-center w-4/5 md:w-5 h-1 bg-black dark:bg-white" />}
                            <p className=" font-bold text-lg ml-3 self-center block md:hidden">Messeages</p>
                        </div>
                    </Link>
                    <Link href="/me/recents">
                        <div className={`relative mb-3 w-auto px-4 h-10 md:px-0 md:w-12 md:h-12 flex flex-row align-middle justify-start md:justify-center rounded-xl ${isActive('/me/recents') ? "bg-gray-300 dark:bg-appColor-selectd" : "hover:bg-gray-300 dark:hover:bg-appColor-selectd"} `} onClick={() => props.closeSidebarMobile()}>
                            <AiOutlineClockCircle size={25} className=" self-center" />
                            {isActive('/me/recents') && <div className=" absolute bottom-0 self-center w-4/5 md:w-5 h-1 bg-black dark:bg-white" />}
                            <p className=" font-bold text-lg ml-3 self-center block md:hidden">Recents</p>
                        </div>
                    </Link>
                    <Link href="/me/contacts">
                        <div className={`relative mb-3 w-auto px-4 h-10 md:px-0 md:w-12 md:h-12 flex flex-row align-middle justify-start md:justify-center rounded-xl ${isActive('/me/contacts') ? "bg-gray-300 dark:bg-appColor-selectd" : "hover:bg-gray-300 dark:hover:bg-appColor-selectd"} `} onClick={() => props.closeSidebarMobile()}>
                            <TiContacts size={25} className=" self-center" />
                            {isActive('/me/contacts') && <div className=" absolute bottom-0 self-center w-4/5 md:w-5 h-1 bg-black dark:bg-white" />}
                            <p className=" font-bold text-lg ml-3 self-center block md:hidden">Contacts</p>
                        </div>
                    </Link>
                </div>
                <div className=" self-start">
                    <Link href="/me/settings">
                        <div className="w-12 h-12 flex align-middle justify-center rounded-xl bg-gray-300 dark:bg-appColor-selectd" onClick={() => props.closeSidebarMobile()}>
                            <AiFillSetting size={30} className=" self-center" />
                        </div>
                    </Link>
                </div>
            </header>
        </>
    )
}

export default SideBar;