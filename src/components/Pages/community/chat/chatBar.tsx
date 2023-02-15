import axios from "axios";
import { useEffect, useState } from "react";
import { FaHandshakeSlash, FaRegHandshake } from "react-icons/fa";
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
      const res = await axios.get(`http://${import.meta.env.VITE_IP_ADD}:3000/api/createGroup/get`);
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

    <div className="w-full relative h-screen z-10">
      <div className="py-3 px-5 mt-6">
        <h3 className="text-2xl mb-9 font-semibold uppercase text-gray-400">Chats</h3>
        <div className="relative text-gray-600 mb-5">
          <input type="search" name="serch" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg className="h-4 w-4 fill-current" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-row justify-between">
        <button onClick={openModal} className="relative w-40 p-2 inline-flex items-center text-sm font-medium text-white rounded-full text-center shadow-lg focus:outline-none focus-visible:ring-2">
          <svg className="w-3 h-3 fill-current flex-shrink-0">
            <FaRegHandshake />
          </svg>
          <span>Join Group</span>
        </button>
        <button onClick={createModal} className="relative w-40 p-2 right-4 inline-flex items-center text-sm font-medium text-white rounded-full text-center shadow-lg focus:outline-none focus-visible:ring-2">
          <svg className="w-3 h-3 fill-current flex-shrink-0">
            <FaRegHandshake />
          </svg>
          <span>Create Group</span>
        </button>
      </div>
        <div className="divide-y divide-gray-200 chatStyle overflow-y-auto">
        {groups.map((p: any) => (
          <button key={p._id} onClick={() => { ClickedGroup(p._id) }} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
            <div className="flex items-center">
              <img className="rounded-full items-start flex-shrink-0 mr-3" src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/createGroup/image?q=${p.image}`} width="32" height="32" alt="Marie Zulfikar" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{p.groupName}</h4>
                <div className="text-[13px]">The video chat ended · 2hrs</div>
              </div>
            </div>
          </button>
        ))}
        </div>
      </div>
    </div>

  )
}

export default ChatBar