import { useEffect, useState } from 'react'
import Navbar_user from '../../../Navbar/User_side/Navbar'
import { io } from "socket.io-client";
import ChatBar from './chatBar';
import ChatBody from './chatBody';
import ChatFooter from './chatFooter';
import JoinModalPage from './joinModal';
import CreatePost from '../posts/createPost';
import CreateModal from './createGroup';

const socket = io("http://localhost:3000");

const ChatPage = () => {
  const [typingStatus, setTypingStatus] = useState('');  

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <>
      <Navbar_user />
      <div className='w-full h-screen flex flex-row'>
        <ChatBar />
        <div className='flex flex-col w-4/6 bg-slate-600'>
          <ChatBody typingStatus={typingStatus}/>
          <ChatFooter socket={socket} />
        </div>
        <JoinModalPage />
        <CreateModal />
        <CreatePost />
      </div>
    </>
  )
}

export default ChatPage