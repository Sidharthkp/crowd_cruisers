import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCreateSwitchOn } from "../../../../redux/createPost";
import { closeGroupSwitch } from "../../../../redux/clickedGroup";
import { css } from '@emotion/css'
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setEditGrpDpSwitchOn } from '../../../../redux/editGrpDp';
import UpdateGrpProfile from './dpChange';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const ROOT_CSS = css({
    height: 400,
    width: "100%",
    '@media (max-width: 480px)': {
        height: 600,
    }
});

const ChatBody = ({ typingStatus }: any) => {
    const dispatch = useDispatch();

    const [datas, setData] = useState<any>({})
    const [msg, setMessage] = useState([])

    const opened = useSelector((state: any) => state.showGroupPage.show);
    const details = useSelector((state: any) => state.showGroupPage.dataSave);

    const handleLeaveChat = () => {
        dispatch(closeGroupSwitch());
    };

    const openModal = (data: any) => {

        if (localStorage.getItem("email") === data.admin) {
            dispatch(setCreateSwitchOn(data._id))
        } else {
            toast.warn("Only Admin can create post...", {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    const openDPModal = (id: any) => {
        if (localStorage.getItem("email") === id.admin) {
            dispatch(setEditGrpDpSwitchOn(id))
        } else {
            toast.warn("Only Admin can Edit DP...", {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    const group = () => {
        try {
            axios
                .post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/createGroup/open`, { details })
                .then((res) => setData(res.data))
                .catch((err) => console.log(err));

        } catch (err) {
            console.log(err);
        }
    }

    const message = () => {
        try {
            axios
                .post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/createGroup/message`, { details })
                .then((res) => setMessage(res.data))
                .catch((err) => console.log(err));

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        group()
        message()
    }, [details, msg])

    return (
        <div className='z-40 smallScreenChatZ'>
            <ToastContainer />
            <UpdateGrpProfile />
            {opened && datas ?
                (

                    <div key={datas._id}>
                        <div className=' w-full flex flex-row items-center p-4 bg-gray-800'>
                            <div className="flex justify-end w-2/6 flex-row mr-3">
                                <FaArrowAltCircleLeft onClick={handleLeaveChat} className="h-6 w-6 text-blue-500 cursor-pointer" />
                            </div>
                            <div className="w-4/6 flex flex-row">
                                <div onClick={() => { openDPModal(datas._id) }} className='mr-4 cursor-pointer rounded-full w-1/6 bg-black'>
                                    <img className='rounded-full w-20'
                                        src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/createGroup/image?q=${datas.image}`}
                                        alt="" />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-bold text-2xl cursor-pointer' onClick={() => { openModal(datas) }}>
                                        {datas.groupName}
                                    </div>
                                    <div className='text-sm font-thin'>
                                        <div className="text-sm text-gray-200">
                                            <p>{typingStatus}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='z-50 bg-gray-300 chat'>
                            <ScrollToBottom className={ROOT_CSS}>
                                {Array.isArray(msg) ? msg.map((message: any) =>
                                    message.name === localStorage.getItem('email') ? (
                                        <div key={message._id} className='w-full flex flex-row justify-end'>
                                            <div className='rounded-xl bg-gray-800 max-w-xs text-black p-4 m-4'>
                                                <div className='flex flex-col justify-start'>
                                                    <div className='text-white'>
                                                        {message.text}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={message._id} className='w-full flex flex-row justify-start'>
                                            <div className='rounded-xl bg-gray-900 p-5 m-4'>
                                                <div className='mb-4 text-red-600 font-bold'>
                                                    {message.name}
                                                </div>
                                                <div className='text-white'>
                                                    {message.text}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ) : null}
                            </ScrollToBottom>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-screen text-black flex flex-col justify-center items-center smallScreenSide bg-gray-300'>
                        <img className='w-40' src="\src\assets\Images\pngegg.png" alt="" />
                        <h1 className='text-2xl mb-5'>Crowd Cruisers Web</h1>
                        <p>“The journey of a thousand miles begins with a single ignition.” </p>
                    </div>
                )
            }
        </div>
    )
}

export default ChatBody