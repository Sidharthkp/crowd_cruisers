import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App