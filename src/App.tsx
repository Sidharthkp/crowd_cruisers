import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Home from "./components/Pages/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAuthorized } from "./redux/Authorization/reducer"
const App = () => {
    const dispatch = useDispatch()
    const authenticated = useSelector((state: any) => state.authentication.authenticated);
    const authorized = useSelector((state: any) => state.authorizer.authorized);
    console.log("Authentication"+authenticated);
    console.log("Authorization >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+authorized);
    console.log(".");
    console.log(".");
    console.log(".");
    console.log(".");
    
    
    if(authenticated && !authorized){
        dispatch(setAuthorized())
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/signup' element={!authorized ? <Signup /> : <Home />} />
                    <Route path='/login' element={!authorized ? <Login /> : <Home />} />
                    <Route path='/' element={authenticated ? <Home /> : <Signup /> } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App