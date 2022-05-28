import {configureStore, createSlice} from '@reduxjs/toolkit';

let showUserMenu = createSlice({
    name : 'showUserMenu',
    initialState : false,
    reducers : {
        setShowUserMenu(state){
            return !state
        }
    }
})

let isLoggedIn = createSlice({
    name: 'isLoggedIn',
    initialState: false,
    reducers : {
        setIsLoggedIn(state){
            return !state
        }
    }
})

let userName = createSlice({
    name: 'userName',
    initialState : "",
    reducers : {
        setUserName(state, action){
            return action.payload.name
        }
    }
})

export let {setShowUserMenu} = showUserMenu.actions
export let {setIsLoggedIn} = isLoggedIn.actions
export let {setUserName} = userName.actions

const store = configureStore({
    reducer:{
        showUserMenu : showUserMenu.reducer,
        isLoggedIn : isLoggedIn.reducer,
        userName : userName.reducer
    }
})

export default store;