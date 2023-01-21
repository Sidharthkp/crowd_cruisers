import { FaCamera, FaPaperPlane, FaSmile } from 'react-icons/fa';
import Navbar_user from '../Navbar/User_side/Navbar';

const community_main = () => {
    const community_profile = (e: any) => {
        e.preventDefault()

    }
    return (
        <>
            <Navbar_user />
            <div className='w-full h-screen flex flex-row'>
                <div className='w-2/6 h-screen flex flex-col bg-gray-900'>

                </div>
                <div className='w-4/6 h-screen flex flex-col'>

                </div>
            </div>
        </>
    )
}

export default community_main