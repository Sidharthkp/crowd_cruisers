import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAuthentication, setNotAuthenticated } from "./redux/Authentication/reducer"
import MapPage from "./components/Pages/map/Map"
import ChatPage from "./components/Pages/community/chat/chatPage"
import Whishlist from "./components/Pages/whishlist/Whishlist"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import { useEffect } from "react"

const App = () => {
    const dispatch = useDispatch()
    const authenticated = useSelector((state: any) => state.authentication.authenticated);
    const authStateListener = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user || !user.emailVerified) {
                return dispatch(setNotAuthenticated())
            }
            return dispatch(setAuthentication())
        })
    }
    useEffect(() => {
        authStateListener()
    }, [authStateListener])
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/map' element={authenticated ? <MapPage /> : <Login />} />
                    <Route path='/signup' element={!authenticated ? <Signup /> : <Home />} />
                    <Route path='/login' element={!authenticated ? <Login /> : <Home />} />
                    <Route path='/' element={<Home />} />
                    <Route path="/community" element={authenticated ? <ChatPage /> : <Login />} />
                    <Route path="/wishlist" element={authenticated ? <Whishlist /> : <Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App