import { useTheme } from 'next-themes'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

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
        </ >
    )
}