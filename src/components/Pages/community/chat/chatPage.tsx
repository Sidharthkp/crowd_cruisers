import { useEffect, useState } from 'react'
import Navbar_user from '../../../Navbar/Navbar'
import { io } from "socket.io-client";
import ChatBar from './chatBar';
import ChatBody from './chatBody';
import ChatFooter from './chatFooter';
import JoinModalPage from './joinModal';
import CreatePost from '../posts/createPost';
import CreateModal from './createGroup';

const socket = io("http://10.4.5.176:3000");

const ChatPage = () => {
  const [typingStatus, setTypingStatus] = useState('');

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <>

      <div className='flex flex-col md:flex-row bg-slate-600'>
        <ChatBar />
        <div className='w-full flex md:w-4/6 flex-col md:mt-16'>
          <ChatBody typingStatus={typingStatus} />
          <ChatFooter socket={socket} />
        </div>
      </div>
      <JoinModalPage />
      <CreateModal />
      <CreatePost />

    </>
  )
}

export default ChatPage