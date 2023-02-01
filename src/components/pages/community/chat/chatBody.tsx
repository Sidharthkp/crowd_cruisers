import { XCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setCreateSwitchOn } from "../../../../redux/createPost";
import { closeGroupSwitch } from "../../../../redux/clickedGroup";
import axios from "axios";
const ChatBody = ({ typingStatus }: any) => {
    const dispatch = useDispatch();

    const [datas, setData] = useState<any>({})
    const [msg, setMessage] = useState([])

    const lastMessageRef = useRef<HTMLDivElement>(null);


    const opened = useSelector((state: any) => state.showGroupPage.show);
    const details = useSelector((state: any) => state.showGroupPage.dataSave);
    

    const handleLeaveChat = () => {
        dispatch(closeGroupSwitch());
    };

    const openModal = (data: any) => {
        dispatch(setCreateSwitchOn(data))
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
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [details, msg])

    return (
        <>
            {opened && datas ?
                (

                    <>
                        <div className='w-full flex flex-row items-center p-4 bg-black'>
                            <div className="w-4/6 flex flex-row">
                                <div className='rounded-full w-1/6'>
                                    <img className='rounded-full w-20' src="https://static.wixstatic.com/media/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg/v1/fit/w_2500,h_1330,al_c/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg" alt="" />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-bold text-2xl cursor-pointer' onClick={()=>{openModal(datas._id)}}>
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
                        <div className='w-full h-full'>
                            <div className='w-full max-h-96 overflow-y-auto scrollbar-hide'>
                                {Array.isArray(msg) ? msg.map((message: any) =>
                                    message.name === localStorage.getItem('email') ? (
                                        <div className='w-full flex flex-row justify-end'>
                                            <div className='rounded-2xl bg-gray-400 max-w-xs text-black p-5 m-4'>
                                                {message.text}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='w-full flex flex-row justify-start'>
                                            <div className='rounded-2xl bg-slate-400 text-black p-5 m-4'>
                                                {message.text}
                                            </div>
                                        </div>
                                    )
                                ) : null}
                                <div ref={lastMessageRef} />
                            </div>
                        </div>
                    </>
                ) :
                <>
                    <div className="flex flex-row w-full h-screen">
                        <div>
                            <img className="h-screen" src="https://wallpapercave.com/dwp1x/wp6988787.png" alt="" />
                        </div>
                        <div>
                            <img className="h-screen" src="https://wallpapercave.com/dwp1x/wp6988787.png" alt="" />
                        </div>
                        <div>
                            <img className="h-screen" src="https://wallpapercave.com/dwp1x/wp6988787.png" alt="" />
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ChatBody