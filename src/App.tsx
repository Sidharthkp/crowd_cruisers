import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import Community from "./components/Pages/community_main"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
const App = () => {
    const authenticated = useSelector((state: any) => state.authentication.authenticated);
    return (
        <div>
            <BrowserRouter>
                <Routes>
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