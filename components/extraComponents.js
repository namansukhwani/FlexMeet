import { toast } from 'react-toastify';

export const createToast = message => {
    toast(message, {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "dark:bg-appColor-appExtraLight bg-gray-500 rounded-xl",
        bodyClassName: "dark:text-white text-black",
    })
}

export const createToastSucess = message => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        // className: "dark:bg-appColor-appExtraLight bg-gray-500 rounded-xl",
        // bodyClassName: "dark:text-white text-black",
    })
}