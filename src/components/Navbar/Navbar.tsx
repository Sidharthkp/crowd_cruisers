import { signOut } from "@firebase/auth";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { setNotAuthenticated } from "../../redux/Authentication/reducer";
import axios from "axios";
import { FaHeartbeat, FaHome, FaListAlt, FaMapMarkerAlt, FaMotorcycle, FaPowerOff, FaUserAlt, FaUsers } from "react-icons/fa";

const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({ profileImage: '' })
    const authenticated = useSelector((state: any) => state.authentication.authenticated);

    const email = localStorage.getItem("email")

    useEffect(() => {
        axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/profile/showProfile`, { email })
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
        <div className="nav">
            <input type="checkbox" id="active" />
            <label htmlFor="active" className="menu-btn"><i className="fas fa-bars"></i></label>
            <div className="wrapper">
                <ul>
                    <li><a className="cursor-pointer flex flex-row justify-center" onClick={home}><FaHome /></a></li>
                    <li><a className="cursor-pointer flex flex-row justify-center" onClick={maps}><FaMapMarkerAlt /></a></li>
                    <li><a className="cursor-pointer flex flex-row justify-center" onClick={community}><FaUsers /></a></li>
                    <li><a className="cursor-pointer flex flex-row justify-center" onClick={rides}><FaMotorcycle /></a></li>
                    <li><a className="cursor-pointer flex flex-row justify-center" onClick={events}><FaListAlt /></a></li>
                    {authenticated ?
                        <div>
                            <li><a className="cursor-pointer flex flex-row justify-center" onClick={wishlist}><FaHeartbeat /></a></li>
                            <li><a className="cursor-pointer flex flex-row justify-center" onClick={profile}><FaUserAlt/></a></li>
                            <li><a className="cursor-pointer flex flex-row justify-center" onClick={logout}><FaPowerOff /></a></li>
                        </div>
                        :
                        <div>
                            <li><a className="cursor-pointer" onClick={login}>Sign In</a></li>
                            <li><a className="cursor-pointer" onClick={signup}>Sign Up</a></li>
                        </div>
                    }
                </ul>
            </div>
        </div>
    );
}


export default NavBar;