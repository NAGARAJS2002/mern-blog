import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true;
        },

        signInSuccess :  (state , action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        
        },

        signInFailure : (state , action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
           state.loading = true;
        },
        deleteUserSuccess : (state , action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false
        },
        deleteUserFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = false;
        },
        updateUserSuccess: (state , action) => {
            state.currentUser = action.payload;
            state.error = null;
           state.loading = false;
        },
        updateUserFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false
        },
        signOutStart:(state) => {
            state.loading = true
        }
        ,
    }
});

export const {signInStart , 
    signInSuccess , 
    signInFailure , 
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserSuccess,
    updateUserFailure,
    updateUserStart,
    signOutStart

} = userSlice.actions;

export default userSlice.reducer
