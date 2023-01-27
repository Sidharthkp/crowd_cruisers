import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa"

const ChatFooter = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        console.log({ userName: localStorage.getItem('userName'), message });
        setMessage('');
    };
    return (
        <div className='w-full flex justify-center align-middle'>
            <form onSubmit={handleSendMessage} className="w-full">
                <div className="flex flex-row">
                    <input value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='w-full shadow-slate-800 rounded-xl bg-slate-300 p-2 h-14 mt-6 ml-6 text-black' type="text" placeholder='Write Something....'>
                    </input>
                    <button className='cursor-pointer shadow-lg shadow-slate-800 rounded-full w-10 h-10 flex justify-center items-center mt-8 mx-2 bg-green-600'>
                        <FaRegPaperPlane />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatFooter