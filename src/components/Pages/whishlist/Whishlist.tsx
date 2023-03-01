import axios from "axios";
import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setRegisterSwitchOn } from "../../../redux/registerPage";
import { setUnRegisterSwitchOn } from "../../../redux/unregister";
import Unregister from "../UnRegisterModal";
import RegisterPage from '../RegisterModal'
import { booleanSwitch } from "../../../redux/boolean";
let currentDate = new Date();
const Whishlist = () => {
    const [posts, setPosts] = useState({ wishList: [] });
    const boolean = useSelector((state: any) => state.changeBoolean.boolean);
    const username = localStorage.getItem('email')
    const dispatch = useDispatch()
    const getPosts = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_CONFIG}/api/userPosts/savedItems`, { username });
            setPosts(res.data);

        } catch (err: any) {
            toast.warn(err.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    useEffect(() => {
        getPosts()
    }, [boolean])

    const openRegisterModal = (id: any) => {
        if (username) {
            dispatch(setRegisterSwitchOn(id))
        } else {
            toast.warn("Please login to continue..", {
                position: toast.POSITION.TOP_CENTER,
            })
        }
    }
    const openUnRegisterModal = (id: any) => {
        if (username) {
            dispatch(setUnRegisterSwitchOn(id))
        } else {
            toast.warn("Please login to continue..", {
                position: toast.POSITION.TOP_CENTER,
            })
        }
    }

    const remove = (id: any) => {
        axios.post(`${import.meta.env.VITE_SERVER_CONFIG}/api/userPosts/removeSaved`, { username, id })
            .then((res) => {
                toast.warn("Removed from wishlist !", {
                    position: toast.POSITION.TOP_CENTER,
                });
                dispatch(booleanSwitch())
            }
            )
            .catch((err) => {
                toast.warn(err.message, {
                    position: toast.POSITION.TOP_CENTER,
                });
            });
    }

    return (

        <div className='mt-5 relative p-10'>
            <ToastContainer />
            <RegisterPage />
            <Unregister />
            <div className='text-white font-bold flex flex-row w-full justify-center p-5 text-3xl'>
                <h1>Wish List</h1>
            </div>
            <div className='flex flex-row w-screen relative overflow-x-auto scrollbar-hide'>
                {
                    posts.wishList?.length > 0 && posts.wishList.map((p: any) => {
                        let newDate = new Date(p.expirationDate)
                        let difference = newDate.getTime() - currentDate.getTime();
                        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
                        return (

                            <div key={p._id}>
                                <div className='relative flex flex-row w-full justify-end'>
                                    <a onClick={() => { remove(p._id) }} className="text-2xl absolute m-5 font-bold text-red-600" ><FaWindowClose className='cursor-pointer' /></a>
                                </div>
                                <div className="nft">
                                    <div className='main'>
                                        <img className='tokenImage'
                                            src={`${import.meta.env.VITE_SERVER_CONFIG}/api/userPosts/image?q=${p.image[0]}`}
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
                    )
                }
            </div>
        </div>
    )
}

export default Whishlist