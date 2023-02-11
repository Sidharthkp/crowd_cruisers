import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setRegisterSwitchOn } from '../../redux/registerPage';
import RegisterPage from './RegisterModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const home = () => {
    const [posts, setPosts] = React.useState([]);
    const dispatch = useDispatch()
    const openRegisterModal = (id: any) => {
        dispatch(setRegisterSwitchOn(id))
    }
    const username = localStorage.getItem("email")
    const saveToWishlist = (id: any) => {
        try {
            axios.post("http://localhost:3000/api/userPosts/wishList", { id, username })
                .then((res) =>
                    toast.success("Saved for later...", {
                        position: toast.POSITION.TOP_CENTER
                    })
                )
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/userPosts");
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPosts()
    }, [])

    return (
        <div className='bg-gray-700 z-0 pt-16'>
            <ToastContainer />
            <RegisterPage />
            <div className='overflow-y-hidden'>
                {posts.length > 0 ? (

                    <div>
                        <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">

                            <div className="carousel-inner relative w-full overflow-hidden">
                                {
                                    posts.map((p: any, index: number) => {
                                        return (
                                            <div className={`carousel-item relative float-left w-full ${index === 0 ? 'active' : ''}`}>
                                                <img
                                                    src={`http://localhost:3000/api/userPosts/image?q=${p.image[0]}`}
                                                    className="block w-full carousal-class"
                                                    alt="..."
                                                />
                                                {/* <div className="carousel-caption hidden md:block absolute text-center">
                                                    <h5 className="text-xl">Slide label</h5>
                                                    <p>{p.description}</p>
                                                </div> */}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button
                                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className='w-full flex flex-row justify-center items-center mt-10'>
                            <div className='w-10 h-0.5 bg-gray-500' />
                            <img src="./src/assets/Images/book-a-service.svg" className='w-12' alt="" />
                            <div className='w-10 h-0.5 bg-gray-500' />

                        </div>
                        {/* ride */}
                        <div className='mt-5 bg-gray-700 p-10'>
                            <div className='text-white font-bold p-5 text-3xl'>
                                <h1>Rides</h1>
                            </div>
                            <div className='flex flex-row overflow-x-scroll overflow-y-hidden'>
                                {
                                    posts.map((p: any) => {
                                        if (p.eventType === 'ride') {
                                            return (

                                                <div className='w-full animate-marquee-infinite'>
                                                    <div className="group relative block bg-black w-80 h-96">
                                                        <img
                                                            alt="Developer"
                                                            src={`http://localhost:3000/api/userPosts/image?q=${p.image[0]}`}
                                                            className="absolute inset-0 h-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                                        />

                                                        <div className="relative p-8">
                                                            <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                                                                {}
                                                            </p>

                                                            <p className="text-2xl font-bold text-white">{p.description}</p>

                                                            <div className="mt-64">
                                                                <div
                                                                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                                                >
                                                                    <div className='flex flex-row w-full justify-center'>
                                                                        <button onClick={() => { openRegisterModal(p._id) }} className="w-32 h-6 mx-2 bg-red-600 font-bold" >Register Now</button>
                                                                        <button onClick={() => { saveToWishlist(p._id) }} className="w-32 h-6 mx-2 bg-yellow-600 font-bold" >Save for later</button>
                                                                    </div>
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
                        <div className='w-full flex flex-row justify-center items-center'>
                            <div className='w-10 h-0.5 bg-gray-500' />
                            <img src="./src/assets/Images/book-a-service.svg" className='w-12' alt="" />
                            <div className='w-10 h-0.5 bg-gray-500' />

                        </div>
                        {/* event */}
                        <div className='mt-5 bg-gray-700 p-10'>
                            <div className='text-white font-bold p-5 text-3xl'>
                                <h1>Events</h1>
                            </div>
                            <div className='flex flex-row overflow-x-scroll overflow-y-hidden'>
                                {
                                    posts.map((p: any) => {
                                        if (p.eventType === 'event') {
                                            return (

                                                <div className='w-full animate-marquee-infinite'>
                                                    <div className="group relative block bg-black w-80 h-96">
                                                        <img
                                                            alt="Developer"
                                                            src={`http://localhost:3000/api/userPosts/image?q=${p.image[0]}`}
                                                            className="absolute inset-0 h-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                                        />

                                                        <div className="relative p-8">
                                                            <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                                                                {}
                                                            </p>

                                                            <p className="text-2xl font-bold text-white">{p.description}</p>

                                                            <div className="mt-64">
                                                                <div
                                                                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                                                >
                                                                    <div className='flex flex-row w-full justify-center'>
                                                                        <button onClick={() => { openRegisterModal(p._id) }} className="w-32 h-6 mx-2 bg-red-600 font-bold" >Register Now</button>
                                                                        <button onClick={() => { saveToWishlist(p._id) }} className="w-32 h-6 mx-2 bg-yellow-600 font-bold" >Save for later</button>
                                                                    </div>
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
        </div >
    )
}
export default home