import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Container = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;

const HomeScreen = () => {

  return (
    <Container>
      <Switch>
        <Route path="/register">
          <RegisterForm/>
        </Route>
        <Route path="/">
          <LoginForm/>
        </Route>
      </Switch>
    </Container>
  );
};

export default HomeScreen;
