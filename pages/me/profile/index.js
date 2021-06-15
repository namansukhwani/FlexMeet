import { useState } from 'react';
import ProfileSidebar from '../../../components/ProfileSidebar';
import { connect } from 'react-redux';
import Image from 'next/image';
import { FaUser, FaUserEdit } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md';
import Modal from '../../../components/Modal'
import { ButtonColor, ButtonGray } from '../../../components/buttons';
import { BeatLoader } from 'react-spinners';
import { updateUserPicture } from '../../../redux/slices/userSlice'
import { useSession } from 'next-auth/client';
import { useTheme } from 'next-themes'

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
        updateUserPicture: (image, token) => dispatch(updateUserPicture({ image: image, token: token }))
    }
}

const Profile = (props) => {

    const [session, loading] = useSession()
    const { theme, setTheme } = useTheme()

    //refs

    //states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newImageError, setnewImageError] = useState("");
    const [newImage, setnewImage] = useState(null);
    const [newImageLoading, setnewImageLoading] = useState(false)
    const [firstName, setfirstName] = useState(props.user.user.givenName)
    const [lastName, setlastName] = useState(props.user.user.familyName)
    const [phoneNo, setphoneNo] = useState('')
    const [address, setaddress] = useState('')
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('')
    const [pincode, setpincode] = useState('')

    //lifecyle

    //methods
    const loadNewImage = (event) => {
        // console.log("IN here4");
        setnewImageLoading(true)
        setnewImageError("");
        const imageFile = event.target.files[0];

        if (!imageFile) {
            setnewImageError("Please Select Image.")
            setnewImageLoading(false)
            return false;
        }
        // console.log("IN here5");
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setnewImageError("Please select valid image.");
            setnewImageLoading(false)
            return false;
        }
        // console.log(imageFile.name);

        const fileReader = new FileReader();
        fileReader.onload = e => {
            // console.log("IN here6");
            // console.log(fileReader.result);
            setnewImage({ imageData: fileReader.result, image: imageFile })
            setnewImageError("");
            setnewImageLoading(false)
            // if (fileReader.result == 2) {
            //     console.log("IN here7");
            //     const img = new Image();
            //     img.onload = () => {
            //         setnewImage(fileReader.result);
            //         setnewImageLoading(false)
            //     };
            //     img.onerror = () => {
            //         setnewImageError("Invalid image Content.");
            //         setnewImageLoading(false)
            //         return false;
            //     };
            //     img.src = e.target.result
            // }
        }

        fileReader.readAsDataURL(imageFile)
    }

    const uploadNewProfilePic = () => {
        if (newImage != null) {
            props.updateUserPicture(newImage, session.accessToken);
            setIsModalOpen(false);
        }
        else {
            return
        }

    }

    //views
    return (
        <>
            <div className="relative flex  flex-col overflow-y-scroll h-full md:overflow-y-hidden md:flex-row scrollbar-none ">
                <ProfileSidebar />
                <div className="flex flex-col md:overflow-y-scroll w-full md:w-3/4 lg:w-3/5 px-5 pb-5 scrollDiv">
                    <h1 className="w-full flex mt-3 py-3 font-bold text-2xl">Edit Profile</h1>
                    <div className="flex justify-center items-center py-4">
                        <div className="relative flex items-center bg-gray-300 dark:bg-appColor-appLight w-32 h-32 justify-center rounded-full border-2 dark:border-appColor-appExtraLight border-gray-400 shadow-lg">
                            {props.user.isLoading ?
                                <FaUser className="self-center text-xl md:text-3xl " />
                                :
                                <Image src={props.user.user.picture} className="rounded-full" objectFit="cover" layout="fill" />
                                // <FaUser className="self-center text-lg md:text-xl " />
                            }
                            <div onClick={() => { setIsModalOpen(!isModalOpen) }} className="absolute flex justify-center items-center right-1 bottom-1 w-7 h-7 rounded-full bg-appColor-otherCard cursor-pointer hover:scale-105 transform ease-in-out duration-150 ">
                                <MdModeEdit size={16} />
                            </div>
                            {props.user.pictureLoading && <div className="absolute flex inset-0 rounded-full bg-appColor-otherCard bg-opacity-40 filter justify-center items-center">
                                <BeatLoader size={10} margin={2} color={theme == "dark" ? "#fff" : "#62646f"} />
                            </div>}
                        </div>
                    </div>
                    <div className="flex flex-row items-center w-full mt-2">
                        <div className="flex self-stretch w-full flex-col mr-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="firstName">First Name<p className="text-red-800" >*</p></label>
                            <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                                <input id="firstName" type="text" value={firstName} onChange={e => { setfirstName(e.target.value) }} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="First name here" />
                            </div>
                        </div>
                        <div className="flex self-stretch w-full flex-col ml-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="lastName">Last Name<p className="text-red-800" >*</p> </label>
                            <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                                <input id="lastName" type="text" value={lastName} onChange={e => { setlastName(e.target.value) }} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="Last name here" />
                            </div>
                        </div>
                    </div>
                    <div className="flex self-stretch w-full flex-col mt-5">
                        <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="email">Email</label>
                        <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                            <input id="email" type="email" readOnly={true} value={props.user.user.email} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="email" />
                        </div>
                    </div>
                    <div className="flex self-stretch w-full flex-col mt-5">
                        <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="phoneNo">Contact Number</label>
                        <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                            <input id="phoneNo" type="tel" value={phoneNo} onChange={e => setphoneNo(e.target.value)} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="Phone number here" />
                        </div>
                    </div>
                    <div className="flex self-stretch w-full flex-col mt-5">
                        <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="address">Address</label>
                        <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                            <input id="address" type="text" value={address} onChange={e => setaddress(e.target.value)} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="Your Address here" />
                        </div>
                    </div>
                    <div className="flex flex-row items-center w-full mt-5">
                        <div className="flex self-stretch w-full flex-col mr-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="city">City</label>
                            <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                                <input id="city" type="text" value={city} onChange={e => { setcity(e.target.value) }} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="City here" />
                            </div>
                        </div>
                        <div className="flex self-stretch w-full flex-col ml-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="state">State</label>
                            <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                                <input id="state" type="text" value={state} onChange={e => { setstate(e.target.value) }} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="State here" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center w-full mt-5">
                        <div className="flex self-stretch w-full flex-col mr-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="zipcode">Zip Code</label>
                            <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                                <input id="zipcode" type="text" value={pincode} onChange={e => { setpincode(e.target.value) }} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="6 digit zipcode here" />
                            </div>
                        </div>
                        <div className="flex self-stretch w-full flex-col ml-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="country">Country</label>
                            <div className="w-full p-2 rounded-xl mt-2 bg-gray-300 dark:bg-appColor-appLight flex ease-in-out transition border dark:border-appColor-appExtraLight border-gray-500 ">
                                <input id="country" type="text" value={country} onChange={e => { setcountry(e.target.value) }} className="flex w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-300 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="Country here" />
                            </div>
                        </div>
                    </div>
                    <ButtonColor lable="Update Profile" className="w-full self-center md:w-3/5 py-4 md:py-3 mt-5" onClick={() => { }} />
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setnewImage(null)
                    setnewImageLoading(false)
                    setnewImageError("")
                }}
                toggleModal={() => { setIsModalOpen(!isModalOpen) }}
                className="lg:h-4/5 lg:w-5/12 md:h-4/5 md:w-7/12"
            >
                <div className="flex flex-col w-full ">

                    <div className="flex flex-row justify-center items-center pb-5 md:py-5 border-b border-gray-300 dark:border-gray-800 md:justify-start">
                        <FaUserEdit className="text-lg" />
                        <p className="text-xl font-medium ml-3">Update Profile Picture</p>
                    </div>
                    <div className="flex mt-1 h-full w-full ">
                        <label htmlFor="file" className="relative flex flex-col justify-between w-full h-full cursor-pointer">
                            <div className="flex h-full flex-col justify-center items-center">
                                {newImageLoading ?
                                    <BeatLoader size={15} margin={2} color="#0e78f9" />
                                    :
                                    newImage != null ?
                                        <div className="relative flex items-center bg-gray-300 dark:bg-appColor-appLight w-32 h-32 justify-center rounded-full border-2 dark:border-appColor-appExtraLight border-gray-400 shadow-lg">
                                            <Image src={newImage.imageData} className="rounded-full" objectFit="cover" layout="fill" />
                                        </div>
                                        :
                                        <>
                                            <p className=" hidden text-base text-appColor-caption md:block">Drag & Drop image here</p>
                                            {newImageError !== "" && <p className="text-sm line-clamp-1">{newImageError}</p>}
                                        </>
                                }

                            </div>
                            <div className="w-full justify-center items-center flex my-1 py-2 border-2 bg-gray-300 dark:bg-appColor-appLight dark:border-appColor-appExtraLight border-gray-400 rounded-xl text-sm font-normal md:text-sm px-3">
                                Browse Images
                            </div>
                        </label>
                        <input
                            id="file"
                            type="file"
                            accept="image/*"
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            onDrop={(e) => loadNewImage(e)}
                            onChange={e => loadNewImage(e)}
                            className="hidden absolute"
                        />

                    </div>
                    <div className="flex flex-row pt-5 pb-2 md:justify-end items-center align-middle">
                        <ButtonGray lable="Cancel" className="mr-1 w-full py-4 md:py-3" onClick={() => { setIsModalOpen(!isModalOpen) }} />
                        <ButtonColor lable="Update" className="ml-1 w-full py-4 md:py-3" onClick={() => { uploadNewProfilePic(); }} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);