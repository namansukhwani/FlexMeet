import ReactModal from 'react-modal';
import { BiArrowBack } from 'react-icons/bi';

const Modal = (props) => {
    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={() => { props.toggleModal() }}
            onAfterClose={() => { props.onClose() }}
            shouldCloseOnOverlayClick={true}
            overlayClassName="absolute inset-0 w-screen h-screen flex justify-center items-cente dark:bg-appColor-appExtraLight dark:bg-opacity-60 bg-gray-300 bg-opacity-60 filter transition-opacity z-30 md:py-12"
            className={`flex dark:bg-appColor-dark bg-appColor-light p-5 h-full w-full md:min-h-0 md:w-min ${props.className ? props.className : ""} self-center pt-9 md:pt-0 md:rounded-xl md:shadow-md overflow-y-scroll scrollDiv outline-none focus:outline-none`}
        >
            <header className="absolute top-0 left-0 right-0 flex flex-row items-center justify-between h-9 w-full px-2 md:hidden">
                <button className="outline-none focus:outline-none focus:bg-transparent mt-1" onClick={() => { props.toggleModal() }}>
                    <BiArrowBack size={34} />
                </button>
            </header>
            {props.children}
        </ReactModal>
    )
}

export default Modal;
