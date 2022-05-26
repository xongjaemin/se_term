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

export let {setShowUserMenu} = showUserMenu.actions

const store = configureStore({
    reducer:{
        showUserMenu : showUserMenu.reducer
    }
})

export default store;