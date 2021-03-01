import React from "react";
import styled from "styled-components";
import DiscordApp from "./DiscordApp";
import HomeScreen from "./HomeScreen";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
  background-color: rgb(32, 34, 37);
  overflow: hidden;
`;

const App = () => {
  const isLoggedIn = false;
  return (
    <AppContainer>
      {isLoggedIn ? (
        <DiscordApp/>
      ) : (
        <HomeScreen/>
      )}
    </AppContainer>
  );
};

export default App;
