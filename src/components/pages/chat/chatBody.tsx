import { useNavigate } from "react-router-dom";
import { XCircleIcon } from '@heroicons/react/24/solid'
const ChatBody = ({ messages, lastMessageRef, typingStatus }: any) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    };

    // dd/mm/yyyy, hh:mm:ss
    const formatDateFromTimestamp = (timestamp: any) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <>
            <div className='w-full flex flex-row items-center p-4 bg-black'>
                <div className="w-4/6 flex flex-row">
                    <div className='rounded-full w-1/6'>
                        <img className='rounded-full w-20' src="https://static.wixstatic.com/media/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg/v1/fit/w_2500,h_1330,al_c/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg" alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <div className='font-bold text-2xl'>
                            Royal Enfield
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
                    {messages.map((message: any) =>
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
                    )}
                    <div ref={lastMessageRef} />
                </div>
            </div>
        </>
    )
}

export default ChatBody