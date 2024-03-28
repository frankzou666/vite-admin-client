
import { configureStore,createStore,applyMiddleware } from '@reduxjs/toolkit'
import TestReducer from './testreducer';
import UserReducer from './usereducer'

const store = configureStore({
    reducer:{
        count:TestReducer,
        user:UserReducer,
    },
})

export default store

