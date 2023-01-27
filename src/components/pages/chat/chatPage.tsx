import { useEffect, useRef, useState } from 'react'
import Navbar_user from '../../Navbar/User_side/Navbar'
import { io } from "socket.io-client";
import ChatBar from './chatBar';
import ChatBody from './chatBody';
import ChatFooter from './chatFooter';

const socket = io("http://localhost:3000");

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);


  useEffect(() => {
    // scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <>
      <Navbar_user />
      <div className='w-full h-full flex flex-row'>
        <ChatBar socket={socket} />
        <div className='flex flex-col w-4/6 bg-slate-600'>
          <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
          <ChatFooter socket={socket} />
        </div>
      </div>
    </>
  )
}

export default ChatPage