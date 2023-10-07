import { configureStore, createSlice } from '@reduxjs/toolkit';

// redux functionallity
// Creating a slice of the Redux store for authentication
const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false}, // Initial state of the slice
    reducers: {
        login(state) {
            state.isLoggedIn = true  // Redux action to set isLoggedIn to true
        }, 
        logout(state) {
            state.isLoggedIn = false // Redux action to set isLoggedIn to false
        },
    },
});

// Exporting the Redux actions for authentication
export const authActions = authSlice.actions;

// Creating the Redux store with the authSlice.reducer
export const store = configureStore({
    reducer: authSlice.reducer
});