import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../Authentication/reducer'
import modalReducer from '../joinModal'
import createPostReducer from '../createPost'

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        showModal: modalReducer,
        showCreatePost: createPostReducer
    },
})
