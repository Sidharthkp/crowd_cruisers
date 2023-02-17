import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRegisterSwitchOn } from '../../redux/registerPage';
import RegisterPage from './RegisterModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';
import { setUnRegisterSwitchOn } from '../../redux/unregister';
import Unregister from './UnRegisterModal';
import { booleanSwitch } from '../../redux/boolean';
let currentDate = new Date();
const home = () => {
    const [posts, setPosts] = React.useState([]);
    const [saved, setSaved] = React.useState([{ _id: '' }]);
    const dispatch = useDispatch()
    const boolean = useSelector((state: any) => state.changeBoolean.boolean);
    const customId = "custom-id-yes";
    const username = localStorage.getItem("email")
    const openRegisterModal = (id: any) => {
        if (username) {
            dispatch(setRegisterSwitchOn(id))
        } else {
            toast.warn("Please login to continue..", {
                position: toast.POSITION.TOP_CENTER,
                toastId: customId
            })
        }
    }
    const openUnRegisterModal = (id: any) => {
        if (username) {
            dispatch(setUnRegisterSwitchOn(id))
        } else {
            toast.warn("Please login to continue..", {
                position: toast.POSITION.TOP_CENTER,
                toastId: customId
            })
        }
    }
    const saveToWishlist = (id: any) => {
        try {
            if (username) {
                axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/wishList`, { id, username })
                    .then((res) => {
                        dispatch(booleanSwitch())
                        toast.success("Saved for later...", {
                            position: toast.POSITION.TOP_CENTER,
                            toastId: customId
                        })
                    }
                    )
                    .catch((err) => console.log(err));
            } else {
                toast.warn("Please login to continue..", {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: customId
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
    const remove = (id: any) => {
        axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/removeSaved`, { username, id })
            .then((res) => {
                {
                    dispatch(booleanSwitch())
                    toast.success("Succesfully removed from whishlist !", {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: customId
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    const getPosts = async () => {
        try {
            const res = await axios.get(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts`);
            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }

    }
    const getSaved = async () => {
        try {
            const res = await axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/savedItems`, { username });
            setSaved(res.data.wishList);

        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        getPosts()
        getSaved()
    }, [boolean])

    return (
        <div className='z-20 h-screen'>
            <ToastContainer />
            <RegisterPage />
            <Unregister />
            <div className='p-4'>
                {posts.length > 0 ? (

                    <div className='relative'>
                        {/* ride */}
                        <div className='mt-5 relative p-10'>
                            <div className='text-white font-bold flex flex-row w-full justify-center p-5 text-3xl'>
                                <h1>Rides</h1>
                            </div>
                            <div className='flex flex-row w-screen relative overflow-x-auto scrollbar-hide'>
                                {
                                    posts.map((p: any) => {
                                        if (p.eventType === 'ride') {
                                            let newDate = new Date(p.expirationDate)
                                            let difference = newDate.getTime() - currentDate.getTime();
                                            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                                            return (

                                                <div key={p._id}>
                                                    <div className='relative flex flex-row w-full justify-end'>
                                                        {saved.some((x) => x._id == p._id)
                                                            ? (
                                                                <a onClick={() => { remove(p._id) }} className="text-2xl absolute m-5 font-bold text-red-600" ><FaHeart className='cursor-pointer' /></a>
                                                            ) : (
                                                                <a onClick={() => { saveToWishlist(p._id) }} className="text-2xl absolute m-5 font-bold text-white" ><FaHeart className='cursor-pointer' /></a>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="nft">
                                                        <div className='main'>
                                                            <img className='tokenImage'
                                                                src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/image?q=${p.image[0]}`}
                                                                alt="NFT" />
                                                            <h2></h2>
                                                            <p className='description'>{p.description}</p>
                                                            <div className='tokenInfo'>
                                                                <div className="price">
                                                                    <div className="mt-64">
                                                                        <div className='flex flex-col'>
                                                                            {p.regMembers.some((x: any) => x.email == username) ? (
                                                                                <button onClick={() => { openUnRegisterModal(p._id) }} className="w-32 h-6 m-5 bg-red-600 font-bold" >Not Interested</button>
                                                                            ) : (
                                                                                <button onClick={() => { openRegisterModal(p._id) }} className="w-32 h-6 m-5 bg-green-600 font-bold" >Register Now</button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="duration">
                                                                    <ins>◷</ins>
                                                                    <p>{TotalDays} days left</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className='mt-5 relative p-10'>
                            <div className='text-white font-bold flex flex-row w-full justify-center p-5 text-3xl'>
                                <h1>Events</h1>
                            </div>
                            <div className='flex flex-row w-screen relative overflow-x-auto scrollbar-hide'>
                                {
                                    posts.map((p: any) => {
                                        if (p.eventType === 'event') {
                                            let newDate = new Date(p.expirationDate)
                                            let difference = newDate.getTime() - currentDate.getTime();
                                            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                                            return (

                                                <div key={p._id}>
                                                    <div className='relative flex flex-row w-full justify-end'>
                                                        {saved.some((x) => x._id == p._id)
                                                            ? (
                                                                <a onClick={() => { remove(p._id) }} className="text-2xl absolute m-5 font-bold text-red-600" ><FaHeart className='cursor-pointer' /></a>
                                                            ) : (
                                                                <a onClick={() => { saveToWishlist(p._id) }} className="text-2xl absolute m-5 font-bold text-white" ><FaHeart className='cursor-pointer' /></a>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="nft">
                                                        <div className='main'>
                                                            <img className='tokenImage'
                                                                src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/image?q=${p.image[0]}`}
                                                                alt="NFT" />
                                                            <h2></h2>
                                                            <p className='description'>{p.description}</p>
                                                            <div className='tokenInfo'>
                                                                <div className="price">
                                                                    <div className="mt-64">
                                                                        <div className='flex flex-col'>
                                                                            {p.regMembers.some((x: any) => x.email == username) ? (
                                                                                <button onClick={() => { openUnRegisterModal(p._id) }} className="w-32 h-6 m-5 bg-red-600 font-bold" >Not Interested</button>
                                                                            ) : (
                                                                                <button onClick={() => { openRegisterModal(p._id) }} className="w-32 h-6 m-5 bg-green-600 font-bold" >Register Now</button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="duration">
                                                                    <ins>◷</ins>
                                                                    <p>{TotalDays} days left</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-screen justify-center items-center flex flex-row'>
                        <div className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center">
                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>

                            <div className="z-10 flex flex-col justify-center items-center text-white w-full h-screen">
                                <h1 className="text-5xl">We are <b>Almost</b> there!</h1>
                                <p>Stay tuned for something amazing!!!</p>



                            </div>

                        </div>

                    </div>
                )}
            </div>
        </ div >
    )
}
export default home