import { } from 'react'
import Image from 'next/image';
import moment from 'moment';
import ProfileSidebar from '../../../components/ProfileSidebar';
import { BiNotificationOff } from 'react-icons/bi';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user
})


const mapDispatchToProps = dispatch => {
    return {

    }
}

// const data = {
//     heading: "Joe Regan",
//     body: "Joy Regan added you to \"CD/CI pipeline meeting\" scheduled for 28 june 2021.",
//     createdAt: new Date('june 17,2021 10:34:00'),
//     type: "avatar",
//     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ3nGxIOI1jzv9POKQz5UKtX_eKLt2sTD5Bw&usqp=CAU",
// }

const Notification = (props) => {
    return (
        <div className="relative flex  flex-col overflow-y-scroll h-full md:overflow-y-hidden md:flex-row scrollbar-none">
            <ProfileSidebar />
            <div className="flex flex-col md:overflow-y-scroll w-full md:w-3/4 lg:w-3/5 px-5 pb-5 pt-5 scrollDiv">
                {props.user.user.notifications.length == 0 ?
                    <div className="flex flex-col h-full justify-center items-center">
                        <BiNotificationOff size={40} />
                        <h1 className="text-xl font-bold">No new notifications</h1>
                    </div>
                    :
                    props.user.user.notifications.map((data, index) => {
                        return (
                            <div key={index.toString()} className="relative flex flex-row dark:bg-appColor-appLight bg-gray-300 rounded-xl p-3 mb-3">
                                {data.type == "avatar" && <div className="flex pr-2 w-max justify-center items-center">
                                    <div className="relative flex items-center bg-gray-300 dark:bg-appColor-appLight w-16 h-16 justify-center rounded-full shadow">
                                        <Image src={data.avatar} className="rounded-full" objectFit="cover" layout="fill" />
                                    </div>
                                </div>}
                                <div className="w-full flex flex-col justify-center items-start">
                                    <h1 className="text-xl font-bold">{data.heading}</h1>
                                    <p className=" text-sm">{data.body}</p>
                                </div>
                                <p className="absolute top-3 right-3 text-xs text-appColor-caption" >{moment(data.createdAt).fromNow()}</p>
                            </div>
                        )
                    })}

            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);