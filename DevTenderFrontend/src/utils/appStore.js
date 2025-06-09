import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlice'
import requestReducer from './requstSlice'
import themeSlice from './themeSlice'
import paymentReducer from "./paymentSlice";



const appStore = configureStore({
    reducer:{
        theme:themeSlice,
        user : userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        request:requestReducer,
        payment: paymentReducer,
    },

})
export default appStore