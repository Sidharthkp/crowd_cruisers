import { useEffect, useState } from 'react'
import Navbar_user from '../../../Navbar/Navbar'
import { io } from "socket.io-client";
import ChatBar from './chatBar';
import ChatBody from './chatBody';
import ChatFooter from './chatFooter';
import JoinModalPage from './joinModal';
import CreatePost from '../posts/createPost';
import CreateModal from './createGroup';

const socket = io(`${import.meta.env.VITE_SERVER_CONFIG}`);

const ChatPage = () => {
  const [typingStatus, setTypingStatus] = useState('');

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, []);

  return (
    <>

      <div className='flex absolute w-full h-full flex-col md:flex-row'>
        <ChatBar />
        <div className='w-full chatBodyStyle h-screen flex chatBodyStyle flex-col'>
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