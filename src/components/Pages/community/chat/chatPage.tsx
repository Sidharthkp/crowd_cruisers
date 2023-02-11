import { useEffect, useState } from 'react'
import Navbar_user from '../../../Navbar/Navbar'
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

      <ChatBar />
      <div className='w-full flex flex-col'>
        <ChatBody typingStatus={typingStatus} />
        <ChatFooter socket={socket} />
      </div>
      <JoinModalPage />
      <CreateModal />
      <CreatePost />

    </>
  )
}

export default ChatPage