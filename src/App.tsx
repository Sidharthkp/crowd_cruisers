import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAuthorized } from "./redux/Authorization/reducer"
const App = () => {
    const dispatch = useDispatch()
    const authenticated = useSelector((state: any) => state.authentication.authenticated);
    console.log(authenticated);
    
    if(authenticated){
        dispatch(setAuthorized())
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/signup' element={!authenticated ? <Signup /> : <Home />} />
                    <Route path='/login' element={!authenticated ? <Login /> : <Home />} />
                    <Route path='/' element={authenticated ? <Home /> : <Signup /> } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App