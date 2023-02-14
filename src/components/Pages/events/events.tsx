import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../../Navbar/Navbar"

const Events = () => {
    const [show, setshow] = useState('');
    const [switchState, setSwitch] = useState(false);
    const [posts, setPosts] = useState([]);
    const username = localStorage.getItem('email')

    const setshowF = (data: any) => {
        setSwitch(!switchState);
        switchState ? setshow(data) : setshow('');
    }
    const handleSubmit = (id: any) => {

        axios
            .post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/join`, { username, id })
            .then((res) => console.log("datasend")
            )
            .catch((err) => console.log(err));
    }

    const addToWishlist = (id: any) => {
        try {
            axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/wishList`, { id, username })
                .then((res) => console.log(res)
                )
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/events`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPosts()
    }, [posts])
    return (
        <div>
            <div className="mx-auto mt-16 container px-4 md:px-6 2xl:px-0 py-12 flex">
                <div className="flex flex-col jusitfy-start items-start">
                    <div>
                        <p className="text-sm leading-4 text-white">Hi, {localStorage.getItem('email')}</p>
                    </div>
                    <div className="mt-3">
                        <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-white">Events</h1>
                    </div>
                    <div className="mt-4">
                        <p className="text-2xl tracking-tight leading-6 text-white">{posts.length} items</p>
                    </div>
                    <div className=" mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
                        {posts && posts.length > 0 && posts.map((e: any) => {
                            return (
                                <div className="flex flex-col mb-20" key={e._id}>
                                    <div className="relative">
                                        <img className="hidden h-60 lg:block" src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/image?q=${e.image[0]}`} alt="shoes" />
                                        <img className="hidden h-60 w-full sm:block lg:hidden" src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/image?q=${e.image[0]}`} alt="shoes" />
                                        <img className="sm:hidden h-60 w-full" src={`http://${import.meta.env.VITE_IP_ADD}:3000/api/userPosts/image?q=${e.image[0]}`} alt="shoes" />
                                    </div>
                                    <div className="mt-6 flex justify-between items-center">
                                        <div className="flex justify-center items-center">
                                            <p className="tracking-tight text-2xl font-semibold leading-6 text-white">{e.description}</p>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <button aria-label="show menu" onClick={() => setshowF(e._id)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400">
                                                <svg className={`fill-stroke ${show === e._id ? "block" : "hidden"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <svg className={`fill-stroke ${show === e._id ? "hidden" : "block"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div id="menu4" className={`flex-col jusitfy-start items-start mt-12 ${show === e._id ? "flex" : "hidden"}`}>
                                        <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                            <div className="w-full">
                                                <button onClick={() => addToWishlist(e._id)} className=" focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800  bg-white border border-gray-800">Save Later</button>
                                            </div>
                                            <div className="w-full">
                                                <button onClick={() => handleSubmit(e._id)} className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2  text-white w-full tracking-tight py-4 text-lg leading-4  hover:bg-black bg-gray-800 border border-gray-800">Register Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events