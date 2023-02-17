import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa"
import { useSelector } from "react-redux";

const ChatFooter = ({ socket }: any) => {
    const [message, setMessage] = useState('');

    const opened = useSelector((state: any) => state.showGroupPage.show);
    const details = useSelector((state: any) => state.showGroupPage.dataSave);

    const handleTyping = () =>
        socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('email')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('email'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
                groupId: details
            });
        }
        setMessage('');
    };
    return (
        <>
            {
                opened ? (
                    <>
                        <div className='w-full mt-auto flex justify-center z-40 h-full align-middle bg-gray-300'>
                            <form onSubmit={handleSendMessage} className="w-full chatInput">
                                <div className="flex flex-row items-center">
                                    <input value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className='w-full shadow-slate-800 rounded-xl z-50 bg-slate-300 p-2 h-14 mt-12 ml-6 text-black' type="text"
                                        placeholder='Write Something....'
                                        onKeyDown={handleTyping}
                                    >
                                    </input>
                                    <button className='cursor-pointer shadow-lg shadow-slate-800 z-50 rounded-full w-16 h-12 flex justify-center items-center mt-12 mx-2 bg-green-600'>
                                        <FaRegPaperPlane />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : null}
        </>
    )
}

export default ChatFooter