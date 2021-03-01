import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import channelReducer from "./channelSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        channel: channelReducer 
    }
})