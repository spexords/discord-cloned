import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import channelReducer from "./channelSlice";
import modalReducer from "./modalSlice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

export default configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    modal: modalReducer,
    middleware: customizedMiddleware
  },
});
