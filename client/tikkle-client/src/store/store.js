import {configureStore, createSlice} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

//storing user information

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

const reducers = combineReducers({
    showUserMenu : showUserMenu.reducer,
    isLoggedIn : isLoggedIn.reducer,
    userName : userName.reducer
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);


export let {setShowUserMenu} = showUserMenu.actions
export let {setIsLoggedIn} = isLoggedIn.actions
export let {setUserName} = userName.actions

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})

export default store;