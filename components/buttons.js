export const ButtonColor = ({ onClick, lable, className = "", mode = "blue" }) => {
    return (
        <button className={`text-white ${mode == "blue" ? "bg-appColor-otherCardDark" : "bg-appColor-purple"} rounded-xl p-2 focus:outline-none outline-none text-sm font-bold md:text-sm px-3 w-full ${className}`} onClick={onClick}>
            {lable}
        </button>
    )
}

export const ButtonGray = ({ onClick, lable, className = "", mode = "outline", style = {} }) => {
    return (
        <button style={style} className={` ${mode == "outline" ? " border" : " border-0"} bg-gray-300 dark:bg-appColor-appLight dark:border-appColor-appExtraLight border-gray-400 rounded-xl p-2 focus:outline-none outline-none text-sm font-bold md:text-sm px-3 w-full ${className}`} onClick={onClick}>
            {lable}
        </button>
    )
}