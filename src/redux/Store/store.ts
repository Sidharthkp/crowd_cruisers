import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../Authentication/reducer'

export default configureStore({
    reducer: { authentication: authenticationReducer },
})
