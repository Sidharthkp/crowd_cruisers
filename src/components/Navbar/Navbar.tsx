import { signOut } from "@firebase/auth";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { setNotAuthenticated } from "../../redux/Authentication/reducer";
import axios from "axios";

const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({ profileImage: '' })
    const authenticated = useSelector((state: any) => state.authentication.authenticated);

    const email = localStorage.getItem("email")

    useEffect(() => {
        axios.post("http://10.4.5.176:3000/api/profile/showProfile", { email })
            .then((res) => setUser(res.data)
            )
            .catch((err) => console.log(err));
    }, [user])

    const community = (e: any) => {
        e.preventDefault()
        navigate('/community');
    }
    const maps = (e: any) => {
        e.preventDefault()
        navigate('/map');
    }
    const login = (e: any) => {
        e.preventDefault()
        navigate('/login');
    }
    const signup = (e: any) => {
        e.preventDefault()
        navigate('/signup');
    }
    const wishlist = (e: any) => {
        e.preventDefault()
        navigate('/wishlist')
    }
    const profile = (e: any) => {
        e.preventDefault()
        navigate('/profile')
    }
    const events = (e: any) => {
        e.preventDefault()
        navigate('/events')
    }
    const rides = (e: any) => {
        e.preventDefault()
        navigate('/rides')
    }

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            dispatch(setNotAuthenticated())
            navigate("/");
        })
    }

    const home = (e: any) => {
        e.preventDefault()
        navigate('/');
    }

    return (
     
        //                                 {authenticated ?
        //                                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        //                                         <Menu.Item>
        //                                             {({ active }) => (
        //                                                 <a
        //                                                     onClick={profile}
        //                                                     className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 cursor-pointer text-sm text-gray-700')}
        //                                                 >
        //                                                     Your Profile
        //                                                 </a>
        //                                             )}
        //                                         </Menu.Item>
        //                                         <Menu.Item>
        //                                             {({ active }) => (
        //                                                 <a
        //                                                     className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700')}
        //                                                 >
        //                                                     Settings
        //                                                 </a>
        //                                             )}
        //                                         </Menu.Item>
        //                                         <Menu.Item>
        //                                             {({ active }) => (
        //                                                 <a
        //                                                     onClick={logout}
        //                                                     className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700')}
        //                                                 >
        //                                                     Sign out
        //                                                 </a>
        //                                             )}
        //                                         </Menu.Item>
        //                                     </Menu.Items> :
        //                                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        //                                         <Menu.Item>
        //                                             {({ active }) => (
        //                                                 <button
        //                                                     onClick={login}
        //                                                     className={classNames(active ? 'bg-gray-100 cursor-pointer w-full' : '', 'block px-4 py-2 w-full text-sm text-gray-700')}
        //                                                 >
        //                                                     Sign In
        //                                                 </button>
        //                                             )}
        //                                         </Menu.Item>
        //                                         <Menu.Item>
        //                                             {({ active }) => (
        //                                                 <button
        //                                                     onClick={signup}
        //                                                     className={classNames(active ? 'bg-gray-100 cursor-pointer w-full' : '', 'block px-4 py-2 text-sm w-full text-gray-700')}
        //                                                 >
        //                                                     Sign Up
        //                                                 </button>
        //                                             )}
        //                                         </Menu.Item>
        //                                     </Menu.Items>
        //                                 }
        //                             </Transition>
        //                         </Menu>
        //                     </div>
        //                 </div>
        //             </div>

        //             <Disclosure.Panel className="sm:hidden">
        //                 <div className="space-y-1 px-2 pt-2 pb-3">
        //                     {navigation.map((item) => (
        //                         <Disclosure.Button
        //                             key={item.name}
        //                             as="a"
        //                             onClick={item.onclick}
        //                             className={classNames(
        //                                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        //                                 'block px-3 py-2 rounded-md text-base font-medium'
        //                             )}
        //                             aria-current={item.current ? 'page' : undefined}
        //                         >
        //                             {item.name}
        //                         </Disclosure.Button>
        //                     ))}
        //                 </div>
        //             </Disclosure.Panel>
        //         </>
        //     )}
        // </Disclosure>
        <div className="nav">
            <input type="checkbox" id="active" />
                <label htmlFor="active" className="menu-btn"><i className="fas fa-bars"></i></label>
                <div className="wrapper">
                    <ul>
                        <li><a className="cursor-pointer" onClick={home}>Home</a></li>
                        <li><a className="cursor-pointer" onClick={maps}>Map</a></li>
                        <li><a className="cursor-pointer" onClick={community}>Community</a></li>
                        <li><a className="cursor-pointer" onClick={rides}>Rides</a></li>
                        <li><a className="cursor-pointer" onClick={events}>Events</a></li>
                    </ul>
                </div>
                <div className="content">
                    <div className="title">
                        Fullscreen Overlay Navigation Bar</div>
                    <p>
                        with HTML & CSS Neon Effect</p>
                </div>
        </div>
    );
}


export default NavBar;