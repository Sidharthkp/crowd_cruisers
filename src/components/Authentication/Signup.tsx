import { FaLinkedinIn, FaGoogle, FaRegEnvelope, FaFacebookF } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { auth, provider } from '../../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setAuthentication } from '../../redux/Authentication/reducer';
import { useNavigate } from 'react-router-dom';
import 'firebase/auth'

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [useremail, setEmail] = useState('');
    const [userpassword, setPassword] = useState('');
    const email: string = useremail
    const password: string = userpassword
    const handleSubmit = (event: any) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then((data: any) => {
            localStorage.setItem("email", data.user.email)
            dispatch(setAuthentication())
            navigate('/')
        })
    }
    //google
    const handleClick = (e: any) => {
        e.preventDefault()
        signInWithPopup(auth, provider).then((data: any) => {
            localStorage.setItem("email", data.user.email)
            dispatch(setAuthentication())
            navigate("/");
        })
    }

    const handleSignIn = (e: any) => {
        e.preventDefault()
        navigate("/login");
    }


    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                <div className='bg-gradient-to-l from-purple-900 sm:bg-gradient-to-t to-black sm:rounded-none rounded-2xl sm:flex-col shadow-2xl flex w-2/3 max-w-4xl sm:w-screen sm:h-fit md:w-screen'>
                    <div className='w-3/5 p-5 sm:w-full'>
                        <div className="text-left font-bold flex flex-col sm:items-center">
                            <a href="#">Crowd<span className='text-gray-400'>Cruisers</span></a>
                        </div>
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-white mb-2">Sign up to Account</h2>
                            <div className='border-2 w-10 border-white inline-block mb-2'></div>
                            <div className='flex justify-center my-2'>
                                <button className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:bg-black hover:text-purple-600'>
                                    <FaFacebookF className='text-sm' />
                                </button>
                                <button className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:text-purple-600 hover:bg-black'>
                                    <FaLinkedinIn className='text-sm' />
                                </button>
                                <button onClick={handleClick} className='border-2 border-gray-500 rounded-full p-3 mx-1 hover:text-purple-600 hover:bg-black'>
                                    <FaGoogle className='text-sm' />
                                </button>
                            </div>
                            {/*Social login section*/}
                            <p className='border-gray-500 my-3'>or use email account</p>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col items-center'>
                                    <div className="bg-white w-64 p-2 flex items-center rounded-2xl mb-3">
                                        <FaRegEnvelope className='text-purple-600 mr-2' />
                                        <input type="email" name='email' value={useremail} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='bg-white text-black outline-none text-sm' />
                                    </div>
                                    <div className="bg-white w-64 p-2 flex items-center rounded-2xl mb-3">
                                        <MdLockOutline className='text-purple-600 mr-2' />
                                        <input type="password" value={userpassword} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='Password' className='bg-white text-black outline-none text-sm' />
                                    </div>
                                    <button className='border-2 border-white rounded-full px-12 py-2 inline-block hover:bg-white hover:text-purple-600 cursor-pointer text-white mt-4'>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/*Sign up section*/}
                    <div className='w-2/5 p-5 bg-gradient-to-r sm:bg-gradient-to-b from-purple-900 to-black rounded-tr-2xl sm:rounded-none sm:w-full rounded-br-2xl py-36 px-12'>
                        <h2 className='text-3xl font-bold mb-2'>Hello, Rider!</h2>
                        <div className='border-2 w-10 border-white inline-block mb-2'></div>
                        <p className='mb-10'>Allready have an account?</p>
                        <button onClick={handleSignIn} className='border-2 border-white rounded-full px-12 py-2 inline-block hover:bg-white hover:text-black'>Sign In</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Signup;