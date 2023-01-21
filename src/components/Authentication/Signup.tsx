import { FaLinkedinIn, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { auth, provider } from '../../firebase/config'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setAuthentication } from '../../redux/Authentication/reducer';
import { useNavigate } from 'react-router-dom';
import 'firebase/auth'
import { LockClosedIcon } from '@heroicons/react/24/outline';

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
        }).catch((error)=>{
            
        })
    }

    const handleSignIn = (e: any) => {
        e.preventDefault()
        navigate("/login");
    }


    return (
        <div className="bg-white w-full h-screen">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto rounded-2xl"
                            src="src\assets\Logo\logo.jpg"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign Up to your account
                        </h2>
                        <div className='flex justify-center my-2'>
                                <button className='border-2 border-gray-500 rounded-full p-3 mx-1 text-black hover:bg-black hover:text-purple-600'>
                                    <FaFacebookF className='text-sm' />
                                </button>
                                <button className='border-2 border-gray-500 rounded-full p-3 mx-1 text-black hover:text-purple-600 hover:bg-black'>
                                    <FaLinkedinIn className='text-sm' />
                                </button>
                                <button onClick={handleClick} className='border-2 border-gray-500 text-black rounded-full p-3 mx-1 hover:text-purple-600 hover:bg-black'>
                                    <FaGoogle className='text-sm' />
                                </button>
                            </div>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input value={useremail} onChange={(e) => setEmail(e.target.value)}
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 bg-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input value={userpassword} onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border bg-white  border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;