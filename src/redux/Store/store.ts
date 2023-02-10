import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from '../Authentication/reducer'
import modalReducer from '../joinModal'
import createModalReducer from '../createModal'
import createPostReducer from '../createPost'
import groupOpenReducer from '../clickedGroup'
import registerOpenReducer from '../registerPage'
import membersReducer from '../members'
import membersJoinedSlice from '../usersJoined'
import showEditDpSlice from '../editDp'

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        showModal: modalReducer,
        showCreatePost: createPostReducer,
        showCreateModal: createModalReducer,
        showGroupPage: groupOpenReducer,
        showRegisterPage: registerOpenReducer,
        showMembers: membersReducer,
        showJoinedMembers: membersJoinedSlice,
        showEditDpModal: showEditDpSlice
    },
})
