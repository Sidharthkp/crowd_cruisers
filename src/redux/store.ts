import { configureStore } from '@reduxjs/toolkit'
import authorizerReducer from "./reducer"
export default configureStore({
    reducer: { authorizer: authorizerReducer },
})
