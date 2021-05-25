import { useState } from 'react'
import { TiThMenu } from 'react-icons/ti'
import { FaUser } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'

function Header(props) {

    //states
    const [search, setsearch] = useState("");

    return (
        <header className=" flex flex-row p-4 md:p-4 z-10 md:border-b bg-appColor-light dark:bg-appColor-dark border-gray-800 justify-between align-middle shadow-sm md:shadow-none">
            <div className="flex flex-row justify-start align-middle" >
                <TiThMenu type="button" size={27} className="self-center md:hidden" onClick={() => props.openSidebarMobile()} />
                <h1 className="font-extrabold text-lg md:text-xl ml-3 self-center">Home</h1>
            </div>
            <div className="flex flex-row justify-items-center align-middle self-end">
                <div className="relative flex-row flex-wrap p-2 rounded-xl bg-gray-200 dark:bg-appColor-appLight hidden md:flex ease-in-out transition">
                    <AiOutlineSearch className="self-center text-lg dark:text-appColor-caption text-appColor-appLight" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        className="ml-1 font-sans placeholder-appColor-appLight dark:placeholder-appColor-caption text-black dark:text-white bg-gray-200 dark:bg-appColor-appLight border-0 outline-none focus:outline-none"
                        placeholder="Search By Keywords"
                    />
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 flex align-middle justify-center rounded-xl bg-appColor-iconColor ml-4 self-center">
                    <FaUser className="self-center text-lg md:text-xl " />
                </div>
            </div>
        </header>
    )
}

export default Header;