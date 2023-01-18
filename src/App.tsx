import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import { BrowserRouter, Route, Routes } from "react-router-dom"
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App