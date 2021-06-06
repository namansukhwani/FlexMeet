import { connect } from 'react-redux';
import Image from 'next/image';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineLogout, AiFillBell, AiFillSetting } from 'react-icons/ai';

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

const ProfileDropdownMenu = (props) => {
    return (
        <div ref={props.refVar} className={`absolute  rounded-xl overflow-hidden dark:bg-appColor-backdropBlurDark shadow-lg bg-appColor-backdropBlur backdrop-filter backdrop-blur-md top-14 md:top-20 right-4 ${props.isOpen ? "flex opacity-100" : " opacity-0 hidden"} ease-in-out duration-200 transform transition`}>
            <div className="flex flex-col p-2 ">
                <div className="flex flex-row self-stretch justify-start items-center cursor-pointer p-2">
                    <div className="relative w-10 h-10 md:w-14 md:h-14 flex align-middle justify-center rounded-full bg-appColor-iconColor self-center outline-none focus:outline-none overflow-hidden">
                        {props.user.isLoading ?
                            <FaUser className="self-center text-lg md:text-xl " />
                            :
                            <Image src={props.user.user.picture} objectFit="cover" width={100} height={100} />
                            // <FaUser className="self-center text-lg md:text-xl " />
                        }
                    </div>
                    <div className="flex-col justify-start items-center ml-3">
                        <p className="font-bold text-sm line-clamp-1">{props.user.user.name}</p>
                        <p className="text-xs dark:text-gray-200 text-gray-700">{props.user.user.email}</p>
                    </div>

                </div>
                <div className="flex-col dark:bg-appColor-appLight bg-gray-300 rounded-xl py-3 px-5">
                    <div className="flex flex-row self-stretch justify-start items-center cursor-pointer">
                        <FaUserAlt className=" text-base" />
                        <p className=" text-sm ml-3">My Profile</p>
                    </div>
                    <div className="flex flex-row self-stretch justify-start items-center mt-3 cursor-pointer">
                        <AiFillBell className=" text-lg" />
                        <p className=" text-sm ml-3">Notifications</p>
                    </div>
                    <div className="flex flex-row self-stretch justify-start items-center mt-3 cursor-pointer">
                        <AiFillSetting className=" text-lg" />
                        <p className=" text-sm ml-3">Settings</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center backdrop-filter  backdrop-blur-xl mt-2 rounded-xl py-3 px-5 cursor-pointer" onClick={props.logout}>
                    <AiOutlineLogout className=" text-lg" />
                    <p className=" font-medium text-sm ml-3">Logout</p>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdownMenu);