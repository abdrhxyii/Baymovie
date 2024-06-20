import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },

    reducers: {
        login(state) {
            state.isLoggedIn = true  
        }, 
        logout(state) {
            state.isLoggedIn = false
        },
    },
});

export const authActions = authSlice.actions;

// export const {login, logout} = authSlice.actions;

// Creating the Redux store with the authSlice.reducer
export const store = configureStore({
    reducer: authSlice.reducer
});