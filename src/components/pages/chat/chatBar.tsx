import { useEffect, useState } from "react";

const ChatBar = ({ socket }: any) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data: any) => setUsers(data));
  }, [socket, users]);
  return (
    <div className='flex flex-col w-2/6 h-full bg-slate-900'>
      <div className='flex flex-row w-full h-12 justify-around items-center p-2'>
        <div className='h-full w-3/6 justify-center items-center flex flex-row'>
          <input type="text"
            placeholder='Enter Community Name'

            className='relative block w-full appearance-none rounded-2xl border border-gray-300 px-3 py-2 text-gray-900 bg-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
          />
        </div>
        <div className='h-full w-2/6 justify-center items-center flex flex-row'>
          <button className='bg-blue-500 hover:bg-blue-700 m-2 text-white font-bold py-1 px-3 rounded-full'>Join Room</button>
        </div>
        <div className='h-full w-1/6 justify-center items-center flex flex-row'>
          <button className='bg-green-500 hover:bg-green-700 m-2 text-white font-bold py-1 px-3 rounded-full'>Create</button>
        </div>
      </div>
      <div className='w-full flex flex-col justify-between h-screen overflow-y-auto scrollbar-hide'>
      {users.map((user: any) => (
        
        <div key={user} className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
          <div className='rounded-full w-1/6'>
            <img className='rounded-full w-16' src="https://static.wixstatic.com/media/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg/v1/fit/w_2500,h_1330,al_c/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg" alt="" />
          </div>
          <div className='flex flex-col'>
            <div className='font-bold text-lg'>
            {user}
            </div>
            <div className='text-sm font-thin'>
              Jonh: Hii, everyone..😃
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default ChatBar