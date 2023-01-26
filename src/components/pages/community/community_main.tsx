import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Navbar_user from '../../Navbar/User_side/Navbar';
import Join from './joinRoom';
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

const community_main = () => {

    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    return (
        <>
            <Navbar_user />
            <div className='w-full h-screen flex flex-row'>
                <div className='w-2/6 h-screen flex flex-col bg-gray-900'>
                    <div className='flex flex-row justify-end p-2'>
                        <FaPlusCircle onClick={() => setShow(true)} className='cursor-pointer' />
                    </div>
                </div>
                <div className='w-4/6 h-screen flex flex-col'>

                </div>
                <Join show={show} username={username} 
                    setUsername={setUsername} 
                    room={room} 
                    setRoom={setRoom} 
                    socket={socket}  />
            </div>
        </>
    )
}

export default community_main