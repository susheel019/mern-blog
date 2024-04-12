import {configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {persistStore} from 'redux-persist';
import themeReducer from '../features/theme/themeSlice'


const rootReducer = combineReducers({
    user:userSlice.reducer,
    theme:themeReducer,
});

const persistConfig = {
    key:'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig , rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false})
    
});

export const persistor = persistStore(store);