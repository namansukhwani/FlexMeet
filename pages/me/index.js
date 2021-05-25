import { RiVideoAddFill } from 'react-icons/ri'
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { SiGooglecalendar } from 'react-icons/si';
import { MdScreenShare } from 'react-icons/md';

export default function Home() {

    return (
        <>
            <div className="flex px-6 py-3 flex-col md:flex-row md:py-10 md:px-12">
                <div className="grid w-full h-auto grid-flow-row grid-cols-2 gap-3 md:gap-6 md:w-2/5 ">
                    <div className=" flex flex-col justify-between w-auto self-stretch   bg-appColor-newCard rounded-xl shadow-lg p-3 md:p-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex align-middle justify-center rounded-xl bg-appColor-newCardLight">
                            <RiVideoAddFill size={26} className=" self-center" />
                        </div>
                        <div className="mt-12">
                            <h1 className="font-bold text-sm ">New Meeting</h1>
                            <p className="font-extralight text-xs">set up new meeting</p>
                        </div>
                    </div>
                    <div className=" flex flex-col justify-between w-auto self-stretch  bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                            <BsFillPlusSquareFill size={20} className=" self-center" />
                        </div>
                        <div className="mt-12">
                            <h1 className="font-bold text-sm ">Join Meeting</h1>
                            <p className="font-extralight text-xs">via invitation link</p>
                        </div>
                    </div>
                    <div className=" flex flex-col justify-between w-auto self-stretch  bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                            <SiGooglecalendar size={20} className=" self-center" />
                        </div>
                        <div className="mt-12">
                            <h1 className="font-bold text-sm ">Schedule</h1>
                            <p className="font-extralight text-xs">plan your meeting</p>
                        </div>
                    </div>
                    <div className=" flex flex-col justify-between w-auto self-stretch  bg-appColor-otherCard rounded-xl shadow-lg p-3 md:p-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex align-middle justify-center rounded-xl bg-appColor-otherCardLight">
                            <MdScreenShare size={20} className=" self-center" />
                        </div>
                        <div className="mt-12">
                            <h1 className="font-bold text-sm ">Share Screen</h1>
                            <p className="font-extralight text-xs">show your work</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-auto md:w-3/5">

                </div>
            </div>
        </ >
    )
}
