import { useRouter } from 'next/router';
import { BiChevronRight } from 'react-icons/bi';
import { MdModeEdit } from 'react-icons/md';
import { AiFillBell } from 'react-icons/ai';
import Link from 'next/link';

const ProfileSidebar = (props) => {

    const router = useRouter();

    //refs

    //states

    //lifecycle

    //methods

    //views
    return (
        <div className="flex-col md:border-r lg:border-r hidden md:flex lg:flex border-gray-300 dark:border-gray-800 md:w-1/4 lg:w-1/5 py-3">
            <Link href="/me/profile">
                <div className="relative flex flex-row justify-start items-center cursor-pointer px-5 py-4 mb-2 md:border-b lg:border-b border-gray-300 dark:border-gray-800">
                    <MdModeEdit className="text-2xl text-appColor-caption" />
                    <p className={`text-base lg:text-lg ${router.pathname == "/me/profile" ? "text-black dark:text-white font-bold" : "text-appColor-caption"} ml-4`}>Edit Profile</p>
                    {router.pathname == "/me/profile" && <BiChevronRight className="text-2xl lg:text-3xl" />}
                </div>
            </Link>
            <Link href="/me/profile/notification">
                <div className="relative flex flex-row justify-start items-center cursor-pointer px-5 py-4 mb-2 md:border-b lg:border-b border-gray-300 dark:border-gray-800">
                    <AiFillBell className="text-2xl text-appColor-caption" />
                    <p className={`text-base lg:text-lg ${router.pathname.startsWith("/me/profile/notification") ? "text-black dark:text-white font-bold" : "text-appColor-caption"} ml-4`}>Notifications</p>
                    {router.pathname.startsWith("/me/profile/notification") && <BiChevronRight className="text-2xl lg:text-3xl" />}
                </div>
            </Link>
        </div>
    )
}

export default ProfileSidebar;