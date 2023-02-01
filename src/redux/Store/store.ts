import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../Authentication/reducer'
import modalReducer from '../joinModal'
import createModalReducer from '../createModal'
import createPostReducer from '../createPost'
import groupOpenReducer from '../clickedGroup'

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        showModal: modalReducer,
        showCreatePost: createPostReducer,
        showCreateModal: createModalReducer,
        showGroupPage: groupOpenReducer
    },
})
