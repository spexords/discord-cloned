import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import channelReducer, { addMessage, deleteMessage } from "./channelSlice";
import modalReducer from "./modalSlice";

import {
  withCallbacks,
  signalMiddleware,
  HttpTransportType,
  HubConnectionBuilder,
} from "redux-signalr";
import { toast } from "react-toastify";

export const connection = new HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_API_CHAT_URL, {
    accessTokenFactory: () => window.localStorage.getItem("jwt"),
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .build();

const callbacks = withCallbacks()
  .add("ReceiveMessage", (msg) => (dispatch) => {
    dispatch(addMessage(msg))
  })
  .add("ReceiveRemoveMessage", id => dispatch => {
    dispatch(deleteMessage(id))
  })
  .add("Send", (info) => () => {
    toast.info(info);
  });

const signalrMiddleware = signalMiddleware({
  callbacks,
  connection,
  shouldConnectionStartImmediately: false
});


export default createStore(
  combineReducers({
    user: userReducer,
    channel: channelReducer,
    modal: modalReducer,
  }),
  applyMiddleware(signalrMiddleware),
);
