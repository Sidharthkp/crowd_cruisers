import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App