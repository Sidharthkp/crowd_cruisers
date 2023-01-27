import { useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar_user from '../../Navbar/User_side/Navbar'

const ChatHome = () => {
  const [roomName, setRoomName] = useState("")
  const handleCommunityChange = (e: any) => {
    setRoomName(e.target.value)
  }
  return (
    <div className='w-full h-screen'>
      <Navbar_user />
      <div className='w-full h-full flex flex-row'>
        <div className='flex flex-col w-2/6 h-full bg-slate-900'>
          <div className='flex flex-row w-full h-12 justify-around items-center p-2'>
            <div className='h-full w-3/6 justify-center items-center flex flex-row'>
              <input type="text"
                placeholder='Enter Community Name'
                value={roomName}
                onChange={handleCommunityChange}
                className='relative block w-full appearance-none rounded-2xl border border-gray-300 px-3 py-2 text-gray-900 bg-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
            </div>
            <div className='h-full w-2/6 justify-center items-center flex flex-row'>
              <Link to={`${roomName}`} className='bg-blue-500 hover:bg-blue-700 m-2 text-white font-bold py-1 px-3 rounded-full'>Join Room</Link>
            </div>
            <div className='h-full w-1/6 justify-center items-center flex flex-row'>
              <Link to={`${roomName}`} className='bg-green-500 hover:bg-green-700 m-2 text-white font-bold py-1 px-3 rounded-full'>Create</Link>
            </div>
          </div>
          <div className='w-full flex flex-col justify-between'>
            <div className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
              <div className='rounded-full w-1/6'>
                <img className='rounded-full w-16' src="https://static.wixstatic.com/media/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg/v1/fit/w_2500,h_1330,al_c/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg" alt="" />
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-lg'>
                  De-off roaders
                </div>
                <div className='text-sm font-thin'>
                  Jonh: Hii, everyone..😃
                </div>
              </div>
            </div>
            <div className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
              <div className='rounded-full w-1/6'>
                <img className='rounded-full w-16' src="https://www.royalenfield.com/content/dam/royal-enfield/india/rides/marquee-rides/astral-ride-spiti/logo/astral-side-logo.png" alt="" />
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-lg'>
                  Astral Ride
                </div>
                <div className='text-sm font-thin'>
                  Jonh: Hii, everyone..😃
                </div>
              </div>
            </div>
            <div className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
              <div className='rounded-full w-1/6'>
                <img className='rounded-full w-16' src="https://www.royalenfield.com/content/dam/royal-enfield/india/rides/marquee-rides/himalayan-odyssey-2022/landing/himalayan-odyessy.png" alt="" />
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-lg'>
                  Royal Enfield
                </div>
                <div className='text-sm font-thin'>
                  Jonh: Hii, everyone..😃
                </div>
              </div>
            </div>
            <div className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
              <div className='rounded-full w-1/6'>
                <img className='rounded-full w-16' src="https://www.royalenfield.com/content/dam/royal-enfield/india/rides/marquee-rides/whiteout-2020/landing/logo.png" alt="" />
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-lg'>
                  Royal Enfield
                </div>
                <div className='text-sm font-thin'>
                  Jonh: Hii, everyone..😃
                </div>
              </div>
            </div>
            <div className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
              <div className='rounded-full w-1/6'>
                <img className='rounded-full w-16' src="https://www.royalenfield.com/content/dam/royal-enfield/india/rides/marquee-rides/home/logos/tour-of-buthan-logo.svg" alt="" />
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-lg'>
                  Royal Enfield
                </div>
                <div className='text-sm font-thin'>
                  Jonh: Hii, everyone..😃
                </div>
              </div>
            </div>
            <div className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
              <div className='rounded-full w-1/6'>
                <img className='rounded-full w-16' src="https://static.wixstatic.com/media/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg/v1/fit/w_2500,h_1330,al_c/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg" alt="" />
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-lg'>
                  Royal Enfield
                </div>
                <div className='text-sm font-thin'>
                  Jonh: Hii, everyone..😃
                </div>
              </div>
            </div>
            <div className='w-full flex flex-row items-center bg cursor-pointer m-2 bg-gray-800 hover:bg-gray-700 p-1 rounded-xl'>
              <div className='rounded-full w-1/6'>
                <img className='rounded-full w-16' src="https://static.wixstatic.com/media/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg/v1/fit/w_2500,h_1330,al_c/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg" alt="" />
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-lg'>
                  Royal Enfield
                </div>
                <div className='text-sm font-thin'>
                  Jonh: Hii, everyone..😃
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-4/6 h-full bg-slate-600'>
          <div className='w-full flex flex-row items-center p-4 bg-black'>
            <div className='rounded-full w-1/6'>
              <img className='rounded-full w-20' src="https://static.wixstatic.com/media/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg/v1/fit/w_2500,h_1330,al_c/006bb8_14ddca3bd1354c76bbcd68157ec38191~mv2.jpg" alt="" />
            </div>
            <div className='flex flex-col'>
              <div className='font-bold text-2xl'>
                Royal Enfield
              </div>
              <div className='text-sm font-thin'>
                You, John, Amal, ....
              </div>
            </div>
          </div>
          <div className='w-full h-full'>
            <div className='w-full h-5/6'>
              <div className='w-full flex flex-row justify-start'>
                <div className='rounded-2xl bg-slate-400 text-black p-5 m-4'>
                  Hello Friend, I'm Sidharth 😉
                </div>
              </div>
              <div className='w-full flex flex-row justify-end'>
                <div className='rounded-2xl bg-gray-400 max-w-xs text-black p-5 m-4'>
                  Hii, Where were you... 😜 Lets plan
                </div>
              </div>
            </div>
            <div className='w-full flex justify-center align-middle'>
              <input className='flex flex-row w-full shadow-slate-800 rounded-xl bg-slate-300 p-2 h-14 mt-6 ml-6 text-black' type="text" placeholder='Write Something....'>
              </input>
              <button className='cursor-pointer shadow-lg shadow-slate-800 rounded-full w-10 h-10 flex justify-center items-center mt-8 mx-2 bg-green-600'>
                <FaRegPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHome