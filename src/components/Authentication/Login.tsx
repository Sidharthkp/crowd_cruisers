import { sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FaLinkedinIn, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../firebase/config';
import { setAuthentication } from '../../redux/Authentication/reducer';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import Error from '../Error/errorPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [show, setShow] = useState(false)
    const [error, setError] = useState("")
    const alert = (error: any) => {
        setError(error)
        setShow(true)
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [useremail, setEmail] = useState('');
    const [userpassword, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const email: string = useremail
    const password: string = userpassword
    const handleSubmit = (event: any) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((data: any) => {
            if (!data.user.emailVerified) {
                sendEmailVerification(data.user)
                    .then(() => {
                        console.log("email sent");
                    })
                    .catch((err: any) => alert(err.message));
            } else {
                localStorage.setItem("email", data.user.email)
                const uid = data.user.uid;
                axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/profile/addNew`, { uid, email })
                    .then((res) => console.log(res)
                    )
                    .catch((err) => console.log(err));
                dispatch(setAuthentication())
                navigate("/");
            }
        }).catch((error) => {
            alert(error.message);
        })
    }
    const signup = (e: any) => {
        e.preventDefault()
        navigate("/signup");
    }

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    //google
    const handleClick = (e: any) => {
        e.preventDefault()
        signInWithPopup(auth, provider).then((data: any) => {
            localStorage.setItem("email", data.user.email)
            const uid = data.user.uid;
            axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/profile/addNew`, { uid, email: data.user.email })
                .then((res) => console.log(res)
                )
                .catch((err) => alert(err.message));
            dispatch(setAuthentication())
            navigate("/");
        }).catch((error) => {
            alert(error);
        })
    }
    return (
        <>
            <div className="w-full h-screen absolute">
                <div className="flex relative backdrop-blur-2xl min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8 shadow-2xl">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto rounded-2xl"
                                src="src\assets\Logo\logo.jpg"
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Sign In to your account
                            </h2>
                            <div className='flex justify-center my-2'>
                                <button className='border-2 border-gray-500 rounded-full p-3 mx-1 text-black hover:bg-black hover:text-white'>
                                    <FaFacebookF className='text-sm' />
                                </button>
                                <button className='border-2 border-gray-500 rounded-full p-3 mx-1 text-black hover:text-white hover:bg-black'>
                                    <FaLinkedinIn className='text-sm' />
                                </button>
                                <button onClick={handleClick} className='border-2 border-gray-500 text-black rounded-full p-3 mx-1 hover:text-white hover:bg-black'>
                                    <FaGoogle className='text-sm' />
                                </button>
                            </div>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="space-y-2 z-20 rounded-md shadow-sm">
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
                                        type={passwordType}
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-b-md border bg-white  border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div className="flex relative items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        onClick={togglePassword}
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                                        Show/Hide password
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-white hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div className='relative w-full flex p-5 flex-row justify-center'>
                                <button className='bg-black w-32'>
                                    Sign In
                                </button>
                            </div>
                            <div>
                                <div className="text-sm">
                                    <a className="font-medium text-white">
                                        Dont have an account?
                                    </a>
                                    <a onClick={signup} className="font-medium ml-2 cursor-pointer text-black hover:text-white">
                                        Sign Up
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Error show={show} errors={error} />
        </>
    )
}

export default Login;