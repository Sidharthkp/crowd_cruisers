import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openGroupSwitch } from "../../../../redux/clickedGroup";
import { setCreateSwitchOn } from "../../../../redux/createModal";
import { setSwitchOn } from "../../../../redux/joinModal";

const ChatBar = () => {
  const [groups, setGroup] = useState([]);
  const dispatch = useDispatch()

  const username = localStorage.getItem('email')

  const getGroups = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/createGroup/get");
      setGroup(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getGroups()
  }, [getGroups])

  const openModal = () => {
    dispatch(setSwitchOn())
  }

  const createModal = () => {
    dispatch(setCreateSwitchOn())
  }

  const ClickedGroup = (data: any) => {
    dispatch(openGroupSwitch(data))
  }

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
          <button onClick={openModal} className='bg-blue-500 hover:bg-blue-700 m-2 text-white font-bold py-1 px-3 rounded-full'>Join Room</button>
        </div>
        <div className='h-full w-1/6 justify-center items-center flex flex-row'>
          <button onClick={createModal} className='bg-green-500 hover:bg-green-700 m-2 text-white font-bold py-1 px-3 rounded-full'>Create</button>
        </div>
      </div>
      <div className='w-full flex flex-col h-screen overflow-y-auto scrollbar-hide'>
        {groups.map((p: any) => (

          p.members.includes(username, 0) &&

          <div key={p._id} onClick={() => { ClickedGroup(p._id) }} className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
            <div className='rounded-full w-1/6'>
              <img className='rounded-full w-16' 
              src={`http://localhost:3000/api/createGroup/image?q=${p.image}`} 
              alt="" />
            </div>
            <div className='flex flex-col'>
              <div className='font-bold text-lg'>
                {p.groupName}
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