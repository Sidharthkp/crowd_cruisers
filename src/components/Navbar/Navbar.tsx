import { signOut } from "@firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { setNotAuthenticated } from "../../redux/Authentication/reducer";
import { FaHeartbeat, FaHome, FaMapMarkerAlt, FaPowerOff, FaUserAlt, FaUsers } from "react-icons/fa";
import { useState } from "react";
import { booleanSwitch } from "../../redux/boolean";

const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const authenticated = useSelector((state: any) => state.authentication.authenticated);

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

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            dispatch(booleanSwitch())
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
            <input type="checkbox" id="active" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
            <label htmlFor="active" className="menu-btn"><i className="fas fa-bars"></i></label>
            <div className="wrapper">
                <ul>
                    <li><a className="cursor-pointer flex flex-row justify-center" onClick={(e) => { home(e); closeMenu(); }}><FaHome /></a></li>
                    <li><a className="cursor-pointer flex flex-row justify-center" onClick={(e) => { maps(e); closeMenu(); }}><FaMapMarkerAlt /></a></li>
                    <li><a className="cursor-pointer flex flex-row justify-center" onClick={(e) => { community(e); closeMenu(); }}><FaUsers /></a></li>
                    {authenticated ?
                        <div>
                            <li><a className="cursor-pointer flex flex-row justify-center" onClick={(e) => { wishlist(e); closeMenu(); }}><FaHeartbeat /></a></li>
                            <li><a className="cursor-pointer flex flex-row justify-center" onClick={(e) => { profile(e); closeMenu(); }}><FaUserAlt /></a></li>
                            <li><a className="cursor-pointer flex flex-row justify-center" onClick={(e) => { logout(); closeMenu(); }}><FaPowerOff /></a></li>
                        </div>
                        :
                        <div>
                            <li><a className="cursor-pointer" onClick={(e) => { login(e); closeMenu(); }}>Sign In</a></li>
                            <li><a className="cursor-pointer" onClick={(e) => { signup(e); closeMenu(); }}>Sign Up</a></li>
                        </div>
                    }
                </ul>
            </div>
        </div>
    );
}


export default NavBar;