import { FaLinkedinIn, FaGoogle, FaRegEnvelope, FaMicrosoft, FaUser, FaUserNinja } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { useState } from 'react';

const Login = () => {
    const [state, setState] = useState('');
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                <div className='bg-purple-900 sm:rounded-none rounded-2xl sm:flex-col shadow-2xl flex w-2/3 max-w-4xl sm:w-screen sm:h-fit md:w-screen'>
                    <div className='w-3/5 p-5 sm:w-full'>
                        <div className="text-left font-bold flex flex-col sm:items-center">
                            <a href="#">Crowd<span className='text-gray-400'>Cruisers</span></a>
                        </div>
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-white mb-2">Sign up to Account</h2>
                            <div className='border-2 w-10 border-white inline-block mb-2'></div>
                            <div className='flex justify-center my-2'>
                                <a href="#" className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:bg-black hover:text-purple-600'>
                                    <FaMicrosoft className='text-sm' />
                                </a>
                                <a href="#" className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:text-purple-600 hover:bg-black'>
                                    <FaLinkedinIn className='text-sm' />
                                </a>
                                <a href="#" className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:text-purple-600 hover:bg-black'>
                                    <FaGoogle className='text-sm' />
                                </a>
                            </div>
                            {/*Social login section*/}
                            <p className='border-gray-500 my-3'>or use email account</p>
                            <div className='flex flex-col items-center'>
                                <div className="bg-white w-64 p-2 flex items-center rounded-2xl mb-3">
                                    <FaUserNinja className='text-purple-600 mr-2' />
                                    <input type="text" name='name' placeholder='Name' className='bg-white outline-none text-sm' />
                                </div>
                                <div className="bg-white w-64 p-2 flex items-center rounded-2xl mb-3">
                                    <FaRegEnvelope className='text-purple-600 mr-2' />
                                    <input type="email" name='email' placeholder='Email' className='bg-white outline-none text-sm' />
                                </div>
                                <div className="bg-white w-64 p-2 flex items-center rounded-2xl mb-3">
                                    <MdLockOutline className='text-purple-600 mr-2' />
                                    <input type="password" name='password' placeholder='Password' className='bg-white outline-none text-sm' />
                                </div>
                                <div className="bg-white w-64 p-2 flex items-center rounded-2xl mb-3">
                                    <MdLockOutline className='text-purple-600 mr-2' />
                                    <input type="password" name='confirm_password' placeholder='Confirm Password' className='bg-white outline-none text-sm' />
                                </div>
                                <a onClick={()=>setState('signup')} href="#" className='border-2 border-white rounded-full px-12 py-2 inline-block hover:bg-white hover:text-purple-600 text-white mt-4'>Sign Up</a>
                            </div>
                        </div>
                    </div>
                    {/*Sign up section*/}
                    <div className='w-2/5 p-5 bg-black rounded-tr-2xl sm:rounded-none sm:w-full rounded-br-2xl py-36 px-12'>
                        <h2 className='text-3xl font-bold mb-2'>Hello, Rider!</h2>
                        <div className='border-2 w-10 border-white inline-block mb-2'></div>
                        <p className='mb-10'>Allready have an account?</p>
                        <a onClick={()=>setState('login')} href="#" className='border-2 border-white rounded-full px-12 py-2 inline-block hover:bg-white hover:text-black'>Sign In</a>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;