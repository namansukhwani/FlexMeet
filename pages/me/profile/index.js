import { useState } from 'react';
import ProfileSidebar from '../../../components/ProfileSidebar';
import { connect } from 'react-redux';
import Image from 'next/image';
import { FaUser, FaUserEdit } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md';
import Modal from '../../../components/Modal'
import { ButtonColor, ButtonGray } from '../../../components/buttons';
import { BeatLoader } from 'react-spinners';
import { updateUserPicture, updateUser } from '../../../redux/slices/userSlice'
import { useSession } from 'next-auth/client';
import { useTheme } from 'next-themes'
import { createToast } from './../../../components/extraComponents';

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => {
    return {
        updateUserPicture: (image, token) => dispatch(updateUserPicture({ image: image, token: token })),
        updateUser: (userData, token) => dispatch(updateUser({ data: userData, token: token }))
    }
}

const Profile = (props) => {
    const onlyNo = /^[0-9]*$/;
    const [session, loading] = useSession()
    const { theme, setTheme } = useTheme()

    //refs

    //states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newImageError, setnewImageError] = useState("");
    const [newImage, setnewImage] = useState(null);
    const [newImageLoading, setnewImageLoading] = useState(false)
    const [firstName, setfirstName] = useState(props.user.user.givenName)
    const [error1, seterror1] = useState(false)
    const [lastName, setlastName] = useState(props.user.user.familyName)
    const [error2, seterror2] = useState(false)
    const [phoneNo, setphoneNo] = useState(props.user.user.phoneNo)
    const [error3, seterror3] = useState(false)
    const [address, setaddress] = useState(props.user.user.address)
    const [error4, seterror4] = useState(false)
    const [city, setcity] = useState(props.user.user.city);
    const [state, setstate] = useState(props.user.user.state);
    const [country, setcountry] = useState(props.user.user.country)
    const [pincode, setpincode] = useState(props.user.user.zipCode)
    const [error5, seterror5] = useState(false)

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

    const updateUser = () => {

        const userUpdateData = {}

        if (firstName.trim() != props.user.user.givenName) {
            if (firstName.trim().length == 0) {
                seterror1(true)
                return
            }
            else {
                userUpdateData.givenName = firstName.trim();
                userUpdateData.name = firstName.trim() + ' ' + lastName.trim();
            }
        }

        if (lastName.trim() != props.user.user.familyName) {
            if (lastName.trim().length == 0) {
                seterror2(true)
                return
            }
            else {
                userUpdateData.familyName = lastName.trim();
                userUpdateData.name = firstName.trim() + ' ' + lastName.trim();
            }
        }

        if (phoneNo.trim() != props.user.user.phoneNo) {
            if (phoneNo.trim().length < 10 || phoneNo.trim().length > 10 || !onlyNo.test(phoneNo)) {
                seterror3(true)
                return
            }
            else {
                userUpdateData.phoneNo = phoneNo.trim();
            }
        }

        if (address.trim() != props.user.user.address) {
            userUpdateData.address = address.trim();
        }

        if (country.trim() != props.user.user.country) {
            userUpdateData.country = country.trim()
        }

        if (state.trim() != props.user.user.state) {
            userUpdateData.state = state.trim()
        }

        if (city.trim() != props.user.user.city) {
            userUpdateData.city = city.trim()
        }

        if (pincode.trim() != props.user.user.zipCode || (pincode.trim().length == 0 && address.trim().length != 0)) {
            if (pincode.trim().length < 6 || pincode.trim().length > 6 || !onlyNo.test(pincode)) {
                seterror5(true)
                return
            }
            else {
                userUpdateData.zipCode = pincode.trim()
            }
        }

        if (Object.keys(userUpdateData).length > 0) {
            console.log("Update the user");
            //update the user details 
            // console.log(userUpdateData);
            props.updateUser(userUpdateData, session.accessToken)
        }
        else {
            createToast("No changes to update.")
        }
    }

    const HelperText = (props) => {
        return (
            <p className={`text-xs text-red-800 mt-1 ${props.error ? "block" : "hidden"}`}>{props.children}</p>
        )
    }

    //views
    return (
        <>
            <div className="relative flex  flex-col overflow-y-scroll h-full md:overflow-y-hidden md:flex-row scrollbar-none ">
                <ProfileSidebar />
                <div className="flex flex-col md:overflow-y-scroll w-full md:w-3/4 lg:w-3/5 px-5 pb-5 scrollDiv">
                    <h1 className="w-full flex mt-3 py-3 font-bold text-2xl">Edit Profile</h1>
                    <div className="flex justify-center items-center py-4">
                        <div className="relative flex items-center bg-gray-200 dark:bg-appColor-appLight w-32 h-32 justify-center rounded-full border-2 dark:border-appColor-appExtraLight border-gray-400 shadow-lg">
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
                            <div className={`w-full p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${error1 ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"} `}>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={e => {
                                        if (error1) {
                                            seterror1(false)
                                        }
                                        setfirstName(e.target.value)
                                        if (e.target.value.trim() === '') {
                                            seterror1(true)
                                        }
                                    }}
                                    className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none"
                                    placeholder="First name here"
                                />
                            </div>
                            <HelperText error={error1}>First name can't be empty.</HelperText>
                        </div>
                        <div className="flex self-stretch w-full flex-col ml-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="lastName">Last Name<p className="text-red-800" >*</p> </label>
                            <div className={`w-full p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${error2 ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"}`}>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={e => {
                                        if (error2) {
                                            seterror2(false)
                                        }
                                        setlastName(e.target.value)
                                        if (e.target.value.trim() === '') {
                                            seterror2(true)
                                        }
                                    }}
                                    className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none"
                                    placeholder="Last name here"
                                />
                            </div>
                            <HelperText error={error2}>Last name can't be empty.</HelperText>
                        </div>
                    </div>
                    <div className="flex self-stretch w-full flex-col mt-5">
                        <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="email">Email</label>
                        <div className={`w-full p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${false ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"}`}>
                            <input id="email" type="email" readOnly={true} value={props.user.user.email} className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="email" />
                        </div>
                    </div>
                    <div className="flex self-stretch w-full flex-col mt-5">
                        <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="phoneNo">Contact Number</label>
                        <div className={`w-full  p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${error3 ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"}`}>
                            <input
                                id="phoneNo"
                                type="tel"
                                value={phoneNo}
                                onChange={e => {
                                    if (error3) {
                                        seterror3(false)
                                    }
                                    setphoneNo(e.target.value)
                                    if (e.target.value.trim().length > 10 || e.target.value.trim().length < 10 || !onlyNo.test(e.target.value)) {
                                        seterror3(true)
                                    }
                                }}
                                className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none"
                                placeholder="Phone number here"
                            />
                        </div>
                        <HelperText error={error3}>Mobile no can't be more or less than 10 digits</HelperText>
                    </div>
                    <div className="flex self-stretch w-full flex-col mt-5">
                        <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="address">Address</label>
                        <div className={`w-full p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${error4 ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"}`}>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={e => {
                                    if (error4) {
                                        seterror4(false)
                                    }
                                    if (e.target.value.length < 71) {
                                        setaddress(e.target.value)
                                    }
                                    else {
                                        seterror4(true)
                                    }
                                }}
                                className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none"
                                placeholder="Your Address here"
                            />
                        </div>
                        <HelperText error={error4}>Address can't be more than 70 words</HelperText>
                    </div>
                    <div className="flex flex-row items-center w-full mt-5">

                        <div className="flex self-stretch w-full flex-col mr-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="country">Country</label>
                            <div className={`w-full p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${false ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"}`}>
                                <input id="country" type="text" value={country} onChange={e => { setcountry(e.target.value) }} className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="Country here" />
                            </div>
                        </div>
                        <div className="flex self-stretch w-full flex-col ml-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="state">State</label>
                            <div className={`w-full p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${false ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"}`}>
                                <input id="state" type="text" value={state} onChange={e => { setstate(e.target.value) }} className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="State here" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center w-full mt-5">
                        <div className="flex self-stretch w-full flex-col mr-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="city">City</label>
                            <div className={`w-full p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${false ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"}`}>
                                <input id="city" type="text" value={city} onChange={e => { setcity(e.target.value) }} className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none" placeholder="City here" />
                            </div>
                        </div>
                        <div className="flex self-stretch w-full flex-col ml-2">
                            <label className="flex font-bold text-sm text-appColor-caption ml-1" htmlFor="zipcode">Zip Code</label>
                            <div className={`w-full p-2 rounded-xl mt-2 bg-gray-200 dark:bg-appColor-appLight flex ease-in-out transition ${error5 ? "border-2 border-red-800" : " border-0 dark:border dark:border-appColor-appExtraLight border-gray-500"}`}>
                                <input
                                    id="zipcode"
                                    type="text"
                                    value={pincode}
                                    onChange={e => {
                                        if (error5) {
                                            seterror5(false)
                                        }
                                        setpincode(e.target.value)
                                        if (e.target.value.trim().length > 6 || e.target.value.trim().length < 6 || !onlyNo.test(e.target.value)) {
                                            seterror5(true)
                                        }
                                    }}
                                    className="flex appearance-none w-full font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none"
                                    placeholder="6 digit zipcode here"
                                />
                            </div>
                            <HelperText error={error5}>Zip code can't be empty or greter than 6 digits if you put address</HelperText>
                        </div>

                    </div>
                    <ButtonColor lable={props.user.userUpdating ? <BeatLoader size={12} margin={2} color="#fff" /> : "Update Profile"} className="w-full self-center md:w-3/5 py-4 md:py-3 mt-5" onClick={() => { if (props.user.userUpdating) { return } updateUser() }} />
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
                                        <div className="relative flex items-center bg-gray-200 dark:bg-appColor-appLight w-32 h-32 justify-center rounded-full border-2 dark:border-appColor-appExtraLight border-gray-400 shadow-lg">
                                            <Image src={newImage.imageData} className="rounded-full" objectFit="cover" layout="fill" />
                                        </div>
                                        :
                                        <>
                                            <p className=" hidden text-base text-appColor-caption md:block">Drag & Drop image here</p>
                                            {newImageError !== "" && <p className="text-sm line-clamp-1">{newImageError}</p>}
                                        </>
                                }

                            </div>
                            <div className="w-full justify-center items-center flex my-1 py-2 border-2 bg-gray-200 dark:bg-appColor-appLight dark:border-appColor-appExtraLight border-gray-400 rounded-xl text-sm font-normal md:text-sm px-3">
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