import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setRegisterSwitchOn } from '../../redux/registerPage';
import RegisterPage from './RegisterModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';
const home = () => {
    const [posts, setPosts] = React.useState([]);
    const dispatch = useDispatch()
    const username = localStorage.getItem("email")
    const openRegisterModal = (id: any) => {
        if(username){
            dispatch(setRegisterSwitchOn(id))
        }else{
            toast.warn("Please login to continue..", {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }
    const saveToWishlist = (id: any) => {
        try {
            if(username){
                axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/wishList`, { id, username })
                .then((res) =>
                    toast.success("Saved for later...", {
                        position: toast.POSITION.TOP_CENTER
                    })
                )
                .catch((err) => console.log(err));
            }else{
                toast.warn("Please login to continue..", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPosts()
    }, [])

    return (
        <div className='z-20 h-screen'>
            <ToastContainer />
            <RegisterPage />
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
                                            return (

                                                <div key={p._id}>
                                                            <div className='relative flex flex-row w-full justify-end'>
                                                                <a onClick={() => { saveToWishlist(p._id) }} className="text-2xl absolute m-5 font-bold text-red-600" ><FaHeart className='cursor-pointer' /></a>
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

                                                                            <button onClick={() => { openRegisterModal(p._id) }} className="w-32 h-6 m-5 bg-red-600 font-bold" >Register Now</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="duration">
                                                                    <ins>◷</ins>
                                                                    <p>11 days left</p>
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
                                            return (

                                                <div key={p._id}>
                                                            <div className='relative flex flex-row w-full justify-end'>
                                                                <a onClick={() => { saveToWishlist(p._id) }} className="text-2xl absolute m-5 font-bold text-red-600" ><FaHeart className='cursor-pointer' /></a>
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

                                                                            <button onClick={() => { openRegisterModal(p._id) }} className="w-32 h-6 m-5 bg-red-600 font-bold" >Register Now</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="duration">
                                                                    <ins>◷</ins>
                                                                    <p>11 days left</p>
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