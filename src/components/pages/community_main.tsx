import { FaCamera, FaPaperPlane, FaSmile } from 'react-icons/fa';
import Navbar_user from '../Navbar/User_side/Navbar';

const community_main = () => {
    const community_profile = (e: any) => {
        e.preventDefault()
        
    }
    return (
        <div className='bg-black w-full h-screen'>
            <Navbar_user />
            <div className='w-full h-screen flex flex-row'>
                <div className='w-1/3 max-h-screen bg-gradient-to-t from-black to-purple-900 flex flex-col sm:w-full'>
                    <div>

                    </div>
                </div>
                <div className='bg- w-2/3 sm:w-0 max-h-screen flex flex-col'>
                    <div className='bg-gray-700 w-full h-16 flex flex-row'>
                        <div className='flex flex-col w-1/6 h-full justify-center items-center'>
                            <div onClick={community_profile} className='cursor-pointer rounded-3xl w-12 h-12'>
                                <img src="https://www.royalenfield.com/content/dam/royal-enfield/india/rides/marquee-rides/chase-the-sun/landing/250x250.png" alt="" />
                            </div>
                        </div>
                        <div className='flex flex-col w-5/6'>
                            <div className='flex flex-row h-full'>
                                <h1 className='text-lg font-bold'>😎Chase the sun 🏍</h1>
                            </div>
                            <div className='flex flex-row'>
                                <h3 className='text-sm font-thin text-gray-400'>You, Fayis, Muhsin, Ajmal....</h3>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-5/6 flex flex-row'>

                    </div>
                    <div className='w-full h-1/6 flex flex-row justify-center items-center'>
                        <div className='rounded-2xl w-5/6 bg-gray-600 h-3/5 flex flex-col justify-center'>
                            <div className='flex flex-row'>
                                <div className='justify-center items-center w-1/6 h-full flex'>
                                    <FaSmile className='mr-10 text-2xl cursor-pointer' />
                                </div>
                                <div className='w-3/6 h-full flex flex-row'>
                                    <input type="text" placeholder='Message' className='bg-gray-600 w-full outline-none' />
                                </div>
                                <div className='w-1/6 h-full flex'>
                                    <FaCamera className='ml-16 justify-end text-2xl cursor-pointer' />
                                </div>
                                <div className='w-1/6 justify-end h-full flex'>
                                    <FaPaperPlane className='mr-10 text-2xl cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default community_main