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
import { FaArrowAltCircleLeft, FaRegEdit, FaRegStickyNote } from 'react-icons/fa';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../firebase/config';
import { setEditGrpNameSwitchOn } from '../../../../redux/grpName';
import EditGrpName from './grpNameEdit';

const ROOT_CSS = css({
    height: 400,
    width: "100%",
    zIndex: 50,
    position: 'relative',
    '@media (max-width: 480px)': {
        height: "100%",
    }
});

const ChatBody = ({ typingStatus }: any) => {
    const dispatch = useDispatch();

    const [datas, setData] = useState<any>({})
    const [msg, setMessage] = useState([])

    const opened = useSelector((state: any) => state.showGroupPage.show);
    const details = useSelector((state: any) => state.showGroupPage.dataSave);
    const boolean = useSelector((state: any) => state.changeBoolean.boolean);

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

    const openNameEdit = (id: any) => {
        if (localStorage.getItem("email") === id.admin) {
            dispatch(setEditGrpNameSwitchOn(id))
        } else {
            toast.warn("Only Admin can Edit Grp Name...", {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    const group = () => {
        try {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const token = await getIdToken(user);
                    axios
                        .post(`${import.meta.env.VITE_SERVER_CONFIG}/api/createGroup/open`, { details }, {
                            headers: {
                                authorization: `Bearer ${token}`,
                            }
                        })
                        .then((res) => setData(res.data))
                        .catch((err) => {
                            toast.warn(err.message, {
                                position: toast.POSITION.TOP_CENTER,
                            });
                        });
                }
            })

        } catch (err: any) {
            toast.warn(err.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    const message = () => {
        try {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const token = await getIdToken(user);
                    axios
                        .post(`${import.meta.env.VITE_SERVER_CONFIG}/api/createGroup/message`, { details }, {
                            headers: {
                                authorization: `Bearer ${token}`,
                            }
                        })
                        .then((res) => {
                            setMessage(res.data)
                        })
                        .catch((err) => {
                            toast.warn(err.message, {
                                position: toast.POSITION.TOP_CENTER,
                            });
                        });
                }
            })

        } catch (err: any) {
            toast.warn(err.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    useEffect(() => {
        group()
        message()
    }, [msg, boolean])

    return (
        <div className='smallScreenChatZ z-40'>
            <ToastContainer />
            <UpdateGrpProfile />
            <EditGrpName />
            {opened && datas ?
                (

                    <div key={datas._id}>
                        <div className='w-full z-50 relative flex flex-row items-center h-20 p-4 bg-black'>
                            <div className="flex justify-end w-2/6 flex-row mr-3">
                                <FaArrowAltCircleLeft onClick={handleLeaveChat} className="h-6 w-6 text-blue-500 cursor-pointer" />
                            </div>
                            <div className="w-4/6 flex flex-row">
                                <div onClick={() => { openDPModal(datas) }} className='mr-4 cursor-pointer rounded-full w-1/6 bg-black'>
                                    {datas.image ? (
                                        <img className='rounded-full z-50 w-16'
                                            src={`${import.meta.env.VITE_SERVER_CONFIG}/api/createGroup/image?q=${datas.image}`}
                                            alt="" />
                                    ) : (
                                        <img src="/src/assets/Images/PngItem_1370051.png" className="w-16 rounded-full" alt="" />
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-bold text-xl flex flex-row cursor-pointer'>
                                        <div onClick={() => { openModal(datas) }}>
                                            {datas.groupName}
                                        </div>
                                        <button className='ml-4 mt-1' onClick={() => { openNameEdit(datas) }}>
                                            <FaRegEdit />
                                        </button>
                                    </div>
                                    <div className='text-sm font-thin'>
                                        <div className="text-sm text-gray-200">
                                            {/* <p>{typingStatus}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='chat z-40'>
                            <ScrollToBottom className={ROOT_CSS}>
                                {Array.isArray(msg) ? msg.map((message: any) =>
                                    message.name === localStorage.getItem('email') ? (
                                        <div key={message._id} className='w-full flex flex-row z-40 justify-end'>
                                            <div className='rounded-xl chatColourSend max-w-xs p-4 z-50 m-4'>
                                                <div className='flex flex-col justify-start'>
                                                    <div className='text-black'>
                                                        {message.text}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={message._id} className='w-full flex flex-row justify-start'>
                                            <div className='rounded-xl chatColourRecieve p-5 z-50 m-4'>
                                                <div className='mb-4 text-black font-bold text-sm'>
                                                    {message.name}
                                                </div>
                                                <div className='text-white z-50'>
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
                        <p>???The journey of a thousand miles begins with a single ignition.??? </p>
                    </div>
                )
            }
        </div>
    )
}

export default ChatBody