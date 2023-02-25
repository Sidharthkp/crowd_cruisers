import { FaLinkedinIn, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { auth, provider } from '../../firebase/config'
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { useDispatch } from 'react-redux'
import { setAuthentication } from '../../redux/Authentication/reducer';
import { useNavigate } from 'react-router-dom';
import 'firebase/auth'
import { useState, useEffect } from 'react';
import Error from '../Error/errorPage';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const Signup = () => {
    const [show, setShow] = useState(false)
    const [error, setError] = useState("")
    const alert = (error: any) => {
        setError(error)
        setShow(true)
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showButton, setButtonShow] = useState(false);
    const [showSeconds, setSeconds] = useState(false);
    const [useremail, setEmail] = useState('');
    const [userpassword, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const email: string = useremail
    const password: string = userpassword

    let seconds = 60;

    const timeout = () => {
        setSeconds(true)
        const makeIteration = () => {
            console.clear();
            if (seconds > 0) {
                console.log(seconds);
                setTimeout(makeIteration, 1000); // 1 second waiting
            }
            seconds -= 1;
        }
        if (seconds === 0) {
            setButtonShow(true)
            setSeconds(false)
        } else {
            setTimeout(makeIteration, 1000); // 1 second waiting
        }
    }

    console.log(showButton);
    

    const handleSubmit = (event: any) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then((data: any) => {
            if (!data.user.emailVerified) {
                sendEmailVerification(data.user)
                    .then(() => {
                        toast.success("Please check your mail !", {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        timeout()
                    })
                    .catch((err: any) => alert(err.message));
            } else {
                dispatch(setAuthentication())
                navigate("/");
            }
        }).catch((error) => {
            alert(error.message);
        })
    }
    //google
    const handleClick = (e: any) => {
        e.preventDefault()
        signInWithPopup(auth, provider).then((data: any) => {
            localStorage.setItem("email", data.user.email)
            const uid = data.user.uid;
            axios.post(`${import.meta.env.VITE_SERVER_CONFIG}/api/profile/addNew`, { uid, email: data.user.email })
                .then((res) => console.log(res)
                )
                .catch((err) => console.log(err));
            dispatch(setAuthentication())
            navigate("/");
        }).catch((error) => {
            alert(error.message);
        })
    }

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    const login = (e: any) => {
        e.preventDefault()
        navigate("/login");
    }

    const resendButton = (e: any) => {
        e.preventDefault()
        setButtonShow(false)
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    toast.success("Please check your mail !", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    navigate('/login')
                })
                .catch((err: any) => alert(err.message));
        } else {
            alert("Something went wrong");
        }
        timeout()
    }


    return (
        <>
            <ToastContainer />
            <div className="w-full h-screen absolute">
                <div className="flex relative  min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className='text-white rounded-full p-5 w-10 h-10 text-2xl left-0 top-0 absolute'>
                        {showSeconds ? seconds : null}
                    </div>
                    <div className="w-full max-w-md space-y-8 p-5 rounded-2xl bg-black/40 backdrop-blur-2xl shadow-2xl">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto rounded-2xl"
                                src="src\assets\Logo\logo.jpg"
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                                Sign Up to your account
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
                            </div>

                            <div className='relative w-full flex p-5 flex-row justify-center'>
                                <button className='bg-black w-32'>
                                    Sign Up
                                </button>
                            </div>
                            {showButton ? (
                                <div className='relative w-full flex p-5 flex-row justify-center'>
                                    <button onClick={(e: any) => { resendButton(e) }} className='bg-black w-32'>
                                        Resend
                                    </button>
                                </div>

                            ) : (
                                null
                            )}
                            <div>
                                <div className="text-sm">
                                    <a className="font-medium text-white">
                                        Have an account?
                                    </a>
                                    <a onClick={login} className="font-medium ml-2 cursor-pointer text-black hover:text-white">
                                        Sign In
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

export default Signup;