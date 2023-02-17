import axios from "axios";
import { useEffect, useState } from "react";
import { FaHandshakeSlash, FaRegHandshake, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { booleanSwitch } from "../../../../redux/boolean";
import { openGroupSwitch } from "../../../../redux/clickedGroup";
import { setCreateSwitchOn } from "../../../../redux/createModal";
import { setSwitchOn } from "../../../../redux/joinModal";

const ChatBar = () => {
  const [groups, setGroup] = useState([]);
  const dispatch = useDispatch()

  const boolean = useSelector((state: any) => state.changeBoolean.boolean);


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
  }, [boolean])

  const openModal = () => {
    dispatch(setSwitchOn())
    dispatch(booleanSwitch())
  }

  const createModal = () => {
    dispatch(setCreateSwitchOn())
    dispatch(booleanSwitch())
  }

  const ClickedGroup = (data: any) => {
    dispatch(openGroupSwitch(data))
  }

  return (

    <div className="w-full relative h-screen z-10">
      <div className="py-3 px-5 mt-6">
        <div className="flex flex-col w-full items-center">
          <h3 className="text-2xl mb-9 font-semibold uppercase text-gray-400">Chats</h3>
          <div className="relative text-gray-600 mb-5 flex flex-row">
            <input type="search" name="serch" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" />
            <div className="absolute flex flex-row w-full">
              <button type="submit" className="relative buttonSearch">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <button onClick={openModal} className="relative bg-black flex flex-row w-40 p-2 items-center text-sm font-medium text-white rounded-full text-center shadow-lg focus:outline-none focus-visible:ring-2">
            <svg className="w-3 h-3 fill-current flex-shrink-0">
              <FaRegHandshake />
            </svg>
            <span>Join</span>
          </button>
          <button onClick={createModal} className="relative bg-white w-40 p-2 right-4 inline-flex items-center text-sm font-medium text-black rounded-full text-center shadow-lg focus:outline-none focus-visible:ring-2">
            <svg className="w-3 h-3 fill-current flex-shrink-0">
              <FaRegHandshake />
            </svg>
            <span>Create</span>
          </button>
        </div>
        <div className="divide-y divide-gray-200 chatStyle overflow-y-auto">
          {groups.map((p: any) =>
            p.members.some((x: any) => x === username) &&
            (
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