import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegHandshake, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { booleanSwitch } from "../../../../redux/boolean";
import { openGroupSwitch } from "../../../../redux/clickedGroup";
import { setCreateSwitchOn } from "../../../../redux/createModal";
import { setSwitchOn } from "../../../../redux/joinModal";

const ChatBar = () => {
  const [groups, setGroup] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch()

  const boolean = useSelector((state: any) => state.changeBoolean.boolean);


  const username = localStorage.getItem('email')

  const searchData = (data: any) => {
    return search === ""
      ? data
      : data.groupName.toLowerCase().includes(search)
  }

  const getGroups = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_CONFIG}/api/createGroup/get`);
      setGroup(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getGroups()
  }, [boolean, search])

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
          <h3 className="text-2xl mb-9 font-semibold uppercase text-white">Chats</h3>
          <div className="relative text-gray-600 mb-5 w-full flex flex-row">
            <input onChange={(e: any) => {
              let searchValue = e.target.value.toLocaleLowerCase();
              setSearch(searchValue)
            }} type="search" name="search" placeholder="Search" className="bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none z-50" />
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
          {groups.filter(searchData).map((p: any) =>
            p.members.some((x: any) => x === username) &&
            (
              <button key={p._id} onClick={() => { ClickedGroup(p._id) }} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img className="rounded-full items-start flex-shrink-0 mr-3" src={`${import.meta.env.VITE_SERVER_CONFIG}/api/createGroup/image?q=${p.image}`} width="32" height="32"/>
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