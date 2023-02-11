import { XCircleIcon } from '@heroicons/react/24/solid'
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

const ROOT_CSS = css({
    height: 400,
    width: 400,
    '@media only screen and (min-width: 1024px)': {
        height: 400,
        width: 1050,
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
                .post("http://localhost:3000/api/createGroup/open", { details })
                .then((res) => setData(res.data))
                .catch((err) => console.log(err));

        } catch (err) {
            console.log(err);
        }
    }

    const message = () => {
        try {
            axios
                .post("http://localhost:3000/api/createGroup/message", { details })
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
        <div className='md:max-w-screen-lg'>
            <ToastContainer />
            <UpdateGrpProfile />
            {opened && datas ?
                (

                    <div key={datas._id}>
                        <div className=' w-full flex flex-row items-center p-4 bg-black'>
                            <div className="w-4/6 flex flex-row">
                                <div onClick={() => { openDPModal(datas._id) }} className='cursor-pointer rounded-full w-1/6 bg-black'>
                                    <img className='rounded-full w-20'
                                        src={`http://localhost:3000/api/createGroup/image?q=${datas.image}`}
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
                            <div className="flex justify-end w-2/6 flex-row">
                                <XCircleIcon onClick={handleLeaveChat} className="h-6 w-6 text-blue-500 cursor-pointer" />
                            </div>
                        </div>
                        <div className='h-full'>
                            <div className=''>
                                <ScrollToBottom className={ROOT_CSS}>
                                    {Array.isArray(msg) ? msg.map((message: any) =>
                                        message.name === localStorage.getItem('email') ? (
                                            <div key={message._id} className='w-full flex flex-row justify-end'>
                                                <div className='rounded-2xl bg-gray-400 max-w-xs text-black p-5 m-4'>
                                                    {message.text}
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={message._id} className='w-full flex flex-row justify-start'>
                                                <div className='rounded-2xl bg-slate-400 text-black p-5 m-4'>
                                                    {message.text}
                                                </div>
                                            </div>
                                        )
                                    ) : null}
                                </ScrollToBottom>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default ChatBody