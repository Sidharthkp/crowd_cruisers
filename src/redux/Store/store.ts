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
import showEditGrpDpSlice from '../editGrpDp'
import showEditUserSlice from '../editUser'
import showUnRegisterSlice from '../unregister'
import booleanSlice from '../boolean'
import showEditGrpNameSlice from '../grpName'

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
        showEditDpModal: showEditDpSlice,
        showEditGrpDpModal: showEditGrpDpSlice,
        showEditUserModal: showEditUserSlice,
        showUnRegisterPage: showUnRegisterSlice,
        changeBoolean: booleanSlice,
        showEditGrpName: showEditGrpNameSlice
    },
})
