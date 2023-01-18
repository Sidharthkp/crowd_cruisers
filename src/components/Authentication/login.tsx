import { FaLinkedinIn, FaGoogle, FaRegEnvelope, FaMicrosoft } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

const Login = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                <div className='bg-black sm:rounded-none rounded-2xl sm:flex-col shadow-2xl flex w-2/3 max-w-4xl sm:w-screen sm:h-fit md:w-screen'>
                    <div className='w-3/5 p-5 sm:w-full'>
                        <div className="text-left font-bold flex flex-col sm:items-center">
                            <a href="#"><span className='text-purple-600'>Crowd</span>Cruisers</a>
                        </div>
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-purple-600 mb-2">Sign in to Account</h2>
                            <div className='border-2 w-10 border-purple-600 inline-block mb-2'></div>
                            <div className='flex justify-center my-2'>
                                <a href="#" className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:bg-purple-600 hover:text-black'>
                                    <FaMicrosoft className='text-sm' />
                                </a>
                                <a href="#" className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:bg-purple-600 hover:text-black'>
                                    <FaLinkedinIn className='text-sm' />
                                </a>
                                <a href="#" className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:bg-purple-600 hover:text-black'>
                                    <FaGoogle className='text-sm' />
                                </a>
                            </div>
                            {/*Social login section*/}
                            <p className='border-gray-500 my-3'>or use email account</p>
                            <div className='flex flex-col items-center'>
                                <div className="bg-gray-600 w-64 p-2 flex items-center rounded-2xl mb-3">
                                    <FaRegEnvelope className='text-gray-400 mr-2' />
                                    <input type="email" name='email' placeholder='Email' className='bg-gray-600 outline-none text-sm' />
                                </div>
                                <div className="bg-gray-600 w-64 p-2 flex items-center rounded-2xl mb-3">
                                    <MdLockOutline className='text-gray-400 mr-2' />
                                    <input type="password" name='password' placeholder='Password' className='bg-gray-600 outline-none text-sm' />
                                </div>
                                <a href="#" className='border-2 border-purple-600 rounded-full px-12 py-2 inline-block hover:bg-purple-600 hover:text-black text-purple-600 mt-10'>Sign In</a>
                            </div>
                        </div>
                    </div>
                    {/*Sign up section*/}
                    <div className='w-2/5 p-5 bg-purple-900 rounded-tr-2xl sm:rounded-none sm:w-full rounded-br-2xl py-36 px-12'>
                        <h2 className='text-3xl font-bold mb-2'>Hello, Rider!</h2>
                        <div className='border-2 w-10 border-white inline-block mb-2'></div>
                        <p className='mb-10'>Fill up your personal information and start journey with us.</p>
                        <a href="#" className='border-2 border-white rounded-full px-12 py-2 inline-block hover:bg-white hover:text-purple-900'>Sign Up</a>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;