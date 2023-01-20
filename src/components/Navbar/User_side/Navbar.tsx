import { signOut } from "@firebase/auth";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/config";
import { setNotAuthenticated } from "../../../redux/Authentication/reducer";
import { setUnauthorized } from "../../../redux/Authorization/reducer";

export default function NavBar() {
    const navigate = useNavigate()
    const [navbar, setNavbar] = useState(false);
    const dispatch = useDispatch()

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            dispatch(setUnauthorized())
            dispatch(setNotAuthenticated())
            navigate("/login");
        })
    }

    const community = (e: any) => {
        e.preventDefault()
        navigate('/community');
    }

    return (
        <nav className="w-full bg-gradient-to-b backdrop-blur backdrop-opacity-10 from-black to-purple-900 shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex lg:flex xl:flex 2xl:flex lg:px-8 xl:px-8 md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 lg:py-5 xl:py-5 2xl:py-5 md:block lg:block xl:block 2xl:block">
                        <a href="#">
                            <img src="..\src\assets\Logo\logo.jpg" className="w-14 mb-1 rounded-full inline-block" alt="" /><h1 className="inline-block text-xl font-bold">Crowd Cruisers</h1>
                        </a>
                        <div className="md:hidden xl:hidden 2xl:hidden lg:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-6 md:block lg:block xl:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex xl:flex lg:flex lg:space-x-6 lg:space-y-0 xl:space-x-6 xl:space-y-0 md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-indigo-200">
                                <a href="#">Home</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="#">Map</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a onClick={community}>Community</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="#">Rides</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="#">Events</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="#">Apparel Store</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sm:hidden space-x-2 lg:inline-block md:inline-block xl:inline-block">
                    <ul className="items-center justify-center space-y-8 md:flex xl:flex lg:flex lg:space-x-6 lg:space-y-0 xl:space-x-6 xl:space-y-0 md:space-x-6 md:space-y-0">
                        <li className="text-white hover:text-indigo-200 mt-5">
                            <a href="#">
                                <FaUserCircle className='text-2xl' />
                            </a>
                        </li>
                        <li className="text-white hover:text-indigo-200 mt-5">
                            <a onClick={logout} className="cursor-pointer pt-5">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}