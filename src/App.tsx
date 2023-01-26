import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAuthentication, setNotAuthenticated } from "./redux/Authentication/reducer"
import MapPage from "./components/Pages/map/Map"
import Room from "./components/Pages/chat/Room"
import ChatHome from "./components/Pages/chat/Community"
const App = () => {
    const dispatch = useDispatch()
    const authenticated = useSelector((state: any) => state.authentication.authenticated);
    if (localStorage.getItem("email") !== null) {
        dispatch(setAuthentication())
    } else {
        dispatch(setNotAuthenticated())
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/map' element={authenticated ? <MapPage /> : <Signup />} />
                    <Route path='/signup' element={!authenticated ? <Signup /> : <Home />} />
                    <Route path='/login' element={!authenticated ? <Login /> : <Home />} />
                    <Route path='/' element={<Home />} />
                    <Route path="/community" element={authenticated ? <ChatHome /> : <Signup />}/>
                    <Route path="/community/:roomId" element={authenticated ? <Room /> : <Signup />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App