import React from "react";
import styled from "styled-components";
import ChannelList from "../components/ChannelList";
import Dashboard from "../components/Dashboard";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
  background-color: rgb(32, 34, 37);
`;


const App = () => {
  return (
  <AppContainer>
      <ChannelList/>
      <Dashboard/>
  </AppContainer>);
};

export default App;
