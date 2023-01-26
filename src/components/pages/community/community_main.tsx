import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Navbar_user from '../../Navbar/User_side/Navbar';
import Join from './joinRoom';

const community_main = () => {

    const [show, setShow] = useState(false)

    return (
        <>
            <Navbar_user />
            <div className='w-full h-screen flex flex-row'>
                <div className='w-2/6 h-screen flex flex-col bg-gray-900'>
                    <div className='flex flex-row justify-end p-2'>
                        <FaPlusCircle onClick={() => setShow(true)} className='cursor-pointer' />
                    </div>
                </div>
                <div className='w-4/6 h-screen flex flex-col'>
                    
                </div>
            <Join show={show} />
            </div>
        </>
    )
}

export default community_main