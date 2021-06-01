import { useTheme } from 'next-themes'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { signOut } from 'next-auth/client'

export default function Settings() {
    const { theme, setTheme } = useTheme()

    return (
        <>
            <div className="flex flex-row justify-between align-middle p-4">
                <div className="flex flex-row justify-start align-middle">
                    <h1 className="text-lg mr-3 self-center" >Change Theme</h1>
                    <button
                        aria-label="Toggle Dark Mode"
                        type="button"
                        className=" outline-none focus:outline-none "
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'dark' ?
                            <BsToggleOn className="text-3xl text-appColor-otherCard self-center" />
                            :
                            <BsToggleOff className="text-3xl self-center" />
                        }
                    </button>
                </div>

                <div className=" self-center float-right bg-gray-300 dark:bg-appColor-appExtraLight rounded-xl p-2  text-sm md:text-base px-3">
                    {theme}
                </div>
            </div>
            <div className="flex justify-between align-middle p-4 mt-2">
                <button onClick={() => { signOut() }} type="button" className="py-3 self-stretch w-full bg-red-700 text-base font-medium text-white shadow-lg flex justify-center items-center rounded-xl md:w-1/5 focus:outline-none outline-none">
                    LOGOUT
                </button>
            </div>
        </ >
    )
}