import ProfileSidebar from '../../../components/ProfileSidebar';

const Notification = (props) => {
    return (
        <div className="relative flex  flex-col overflow-y-scroll h-full md:overflow-y-hidden md:flex-row scrollbar-none">
            <ProfileSidebar />
            <div>

            </div>
        </div>
    )
}

export default Notification;