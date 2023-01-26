import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import Community from "./components/Pages/community/community_main"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAuthentication, setNotAuthenticated } from "./redux/Authentication/reducer"
import MapPage from "./components/Pages/map/Map"
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
                    <Route path='/community' element={authenticated ? <Community /> : <Signup />} />
                    <Route path='/signup' element={!authenticated ? <Signup /> : <Home />} />
                    <Route path='/login' element={!authenticated ? <Login /> : <Home />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App