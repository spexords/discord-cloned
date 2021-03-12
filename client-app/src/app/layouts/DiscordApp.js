import React, { useEffect } from "react";
import { HubConnectionState } from "redux-signalr";
import ChannelList from "../components/ChannelList";
import Dashboard from "../components/Dashboard";
import { connection } from "../stores/store";

const DiscordApp = () => {
  useEffect(() => {
    if (connection.state !== HubConnectionState.Connected) {
      connection
        .start()
        .then(() => {})
        .catch((err) => console.error(err.toString()));
    }
    return () =>
      connection
        .stop()
        .then(() => {})
        .catch((err) => console.error(err.toString()));
  }, []);
  return (
    <>
      <ChannelList />
      <Dashboard />
    </>
  );
};

export default DiscordApp;
