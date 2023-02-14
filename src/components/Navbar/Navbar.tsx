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
                    <li><a className="cursor-pointer" onClick={home}>Home</a></li>
                    <li><a className="cursor-pointer" onClick={maps}>Map</a></li>
                    <li><a className="cursor-pointer" onClick={community}>Community</a></li>
                    <li><a className="cursor-pointer" onClick={rides}>Rides</a></li>
                    <li><a className="cursor-pointer" onClick={events}>Events</a></li>
                    {authenticated ?
                        <div>
                            <li><a className="cursor-pointer" onClick={profile}>Your Profile</a></li>
                            <li><a className="cursor-pointer" onClick={logout}>Sign out</a></li>
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