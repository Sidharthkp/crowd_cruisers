import { useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import Navbar_user from '../../Navbar/User_side/Navbar'
import { io } from "socket.io-client";
import ChatBar from './chatBar';
import ChatBody from './chatBody';
import ChatFooter from './chatFooter';

const socket = io("http://localhost:3000");

const ChatPage = () => {

  return (
    <>
      <Navbar_user />
      <div className='w-full h-full flex flex-row'>
        <ChatBar />
        <div className='flex flex-col w-4/6 bg-slate-600'>
          <ChatBody />
          <ChatFooter />
        </div>
      </div>
    </>
  )
}

export default ChatPage