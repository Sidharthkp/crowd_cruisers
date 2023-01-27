import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../Authentication/reducer'
import modalReducer from '../joinModal'

export default configureStore({
    reducer: { authentication: authenticationReducer, showModal: modalReducer },
})
