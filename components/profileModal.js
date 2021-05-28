const ProfileModal = (props) => {
    return (
        <div className="absolute flex z-30 bg-gray-500 bg-opacity-60 backdrop-filter backdrop-blur-sm inset-0 justify-center items-center " onClick={() => props.closeModal()}>

            <div className="relative z-50  bg-appColor-light dark:bg-appColor-dark rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className=" bg-appColor-light dark:bg-appColor-dark px-4 py-4 md:p-6">

                </div>
            </div>
        </div>
    )
}

export default ProfileModal;