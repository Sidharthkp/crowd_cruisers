import axios from "axios";
import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setRegisterSwitchOn } from "../../../redux/registerPage";
import { setUnRegisterSwitchOn } from "../../../redux/unregister";
import Unregister from "../UnRegisterModal";
import RegisterPage from '../RegisterModal'
let currentDate = new Date();
const Whishlist = () => {
    const [posts, setPosts] = useState({ wishList: [] });
    const [boolean, setBoolean] = useState(false);

    const username = localStorage.getItem('email')
    const dispatch = useDispatch()
    const getPosts = async () => {
        try {
            const res = await axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/savedItems`, { username });
            setPosts(res.data);

        } catch (err) {
            console.log(err);
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
        setBoolean(!boolean)
        axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/removeSaved`, { username, id })
            .then((res) => console.log("datasend")
            )
            .catch((err) => console.log(err));
    }

    return (
        // <div>
        //     <NavBar />
        //     <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center bg-white">
        //         <div className="flex flex-col jusitfy-start items-start">
        //             <div>
        //                 <p className="text-sm leading-4 text-gray-600">Hi, {localStorage.getItem('email')}</p>
        //             </div>
        //             <div className="mt-3">
        //                 <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Your saved items</h1>
        //             </div>
        //             <div className="mt-4">
        //                 <p className="text-2xl tracking-tight leading-6 text-gray-600">{posts.length} items</p>
        //             </div>
        //             <div className=" mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
        //                 {posts && posts.length > 0 && posts.map((e: any) => {
        //                     return (
        //                         <div className="flex flex-col" key={e._id}>
        //                             <div className="relative">
        //                                 <img className="hidden h-60 lg:block" src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/image?q=${e.eventId.image[0]}`} alt="shoes" />
        //                                 <img className="hidden h-60 w-full sm:block lg:hidden" src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/image?q=${e.eventId.image[0]}`} alt="shoes" />
        //                                 <img className="sm:hidden h-60 w-full" src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/image?q=${e.eventId.image[0]}`} alt="shoes" />
        //                                 <button onClick={() => remove(e.eventId._id)} aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute  p-1.5 bg-gray-800 text-white hover:text-gray-400">
        //                                     <svg className="fil-current" width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                         <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        //                                         <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        //                                     </svg>
        //                                 </button>
        //                             </div>
        //                             <div className="mt-6 flex justify-between items-center">
        //                                 <div className="flex justify-center items-center">
        //                                     <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">{e.eventId.description}</p>
        //                                 </div>
        //                                 <div className="flex justify-center items-center">
        //                                     <button aria-label="show menu" onClick={() => setshowF(e._id)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400">
        //                                         <svg className={`fill-stroke ${show === e._id ? "block" : "hidden"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                             <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        //                                         </svg>
        //                                         <svg className={`fill-stroke ${show === e._id ? "hidden" : "block"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                                             <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        //                                         </svg>
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                             <div id="menu4" className={`flex-col jusitfy-start items-start mt-12 ${show === e._id ? "flex" : "hidden"}`}>
        //                                 <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
        //                                     <div className="w-full">
        //                                         <button onClick={() => remove(e._id)} className=" focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800  bg-white border border-gray-800">Remove</button>
        //                                     </div>
        //                                     <div className="w-full">
        //                                         <button onClick={() => handleSubmit(e.eventId._id)} className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2  text-white w-full tracking-tight py-4 text-lg leading-4  hover:bg-black bg-gray-800 border border-gray-800">Register Now</button>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     )
        //                 })}
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className='mt-5 relative p-10'>
            <ToastContainer />
            <RegisterPage />
            <Unregister />
            <div className='text-white font-bold flex flex-row w-full justify-center p-5 text-3xl'>
                <h1>Wish List</h1>
            </div>
            <div className='flex flex-row w-screen relative overflow-x-auto scrollbar-hide'>
                {
                    posts.wishList.length > 0 && posts.wishList.map((p: any) => {
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
                    )
                }
            </div>
        </div>
    )
}

export default Whishlist