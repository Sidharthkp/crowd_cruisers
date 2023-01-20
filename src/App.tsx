import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const authorized = useSelector((state: any) => state.authorizer.authorized);
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {authorized}
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App