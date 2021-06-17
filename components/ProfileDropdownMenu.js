import { connect } from 'react-redux';
import Image from 'next/image';
import { FaUserAlt, FaUser } from 'react-icons/fa';
import { AiOutlineLogout, AiFillBell, AiFillSetting } from 'react-icons/ai';
import Link from 'next/link';

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

const ProfileDropdownMenu = (props) => {

    if (props.user.isLoading) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            <div className={` ${props.isOpen ? "flex" : "hidden"} justify-center items-cente dark:bg-appColor-appExtraLight dark:bg-opacity-80 bg-gray-300 bg-opacity-80 filter transition-opacity z-20 absolute top-0 bottom-0 right-0 left-0 w-screen h-screen inset-0 md:hidden `} />
            <div ref={props.refVar} className={`absolute z-30 top-1/4 flex self-stretch left-8 right-8 md:self-auto md:w-min rounded-xl overflow-hidden dark:bg-appColor-backdropBlurDark shadow-lg bg-appColor-backdropBlur backdrop-filter backdrop-blur-md md:left-auto md:top-20 md:right-4 ${props.isOpen ? "flex opacity-100" : " opacity-0 hidden"} ease-in-out duration-200 transform transition`}>
                <div className="flex flex-col p-2 self-stretch w-full md:w-min md:self-auto">
                    <Link href="/me/profile">
                        <div className="flex flex-row self-stretch justify-start items-center cursor-pointer p-2" onClick={() => { props.closeMenu() }}>
                            <div className="relative w-14 h-14 flex align-middle justify-center rounded-full bg-appColor-iconColor self-center outline-none focus:outline-none overflow-hidden">
                                {props.user.isLoading ?
                                    <FaUser className="self-center text-lg md:text-xl " />
                                    :
                                    <Image src={props.user.user.picture} objectFit="cover" width={100} height={100} />
                                    // <FaUser className="self-center text-lg md:text-xl " />
                                }
                            </div>
                            <div className="flex-col justify-start items-center ml-3">
                                <p className="font-bold text-base line-clamp-1">{props.user.user.name}</p>
                                <p className="text-sm dark:text-gray-200 text-gray-700">{props.user.user.email}</p>
                            </div>

                        </div>
                    </Link>
                    <div className="flex-col dark:bg-appColor-appLight bg-gray-300 rounded-xl py-3 px-5">
                        <Link href="/me/profile">
                            <div className="flex flex-row self-stretch justify-start items-center cursor-pointer" onClick={() => { props.closeMenu() }}>
                                <FaUserAlt className=" text-base" />
                                <p className=" text-base ml-3">My Profile</p>
                            </div>
                        </Link>
                        <Link href="/me/profile/notification">
                            <div className="flex flex-row self-stretch justify-start items-center mt-4 cursor-pointer" onClick={() => { props.closeMenu() }}>
                                <AiFillBell className=" text-lg" />
                                <p className=" text-base ml-3">Notifications</p>
                            </div>
                        </Link>
                        <Link href="/me/settings">
                            <div className="flex flex-row self-stretch justify-start items-center mt-4 cursor-pointer" onClick={() => { props.closeMenu() }}>
                                <AiFillSetting className=" text-lg" />
                                <p className=" text-base ml-3">Settings</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-row justify-center items-center backdrop-filter  backdrop-blur-xl mt-2 rounded-xl py-3 px-5 cursor-pointer" onClick={props.logout}>
                        <AiOutlineLogout className=" text-lg" />
                        <p className=" font-medium text-sm ml-3">Logout</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdownMenu);