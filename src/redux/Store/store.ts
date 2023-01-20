import { configureStore } from '@reduxjs/toolkit'
import authorizerReducer from "../Authorization/reducer"
import authenticationReducer from '../Authentication/reducer'
export default configureStore({
    reducer: { authorizer: authorizerReducer, authentication: authenticationReducer },
})
