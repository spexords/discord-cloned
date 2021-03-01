import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { history } from "../..";

const Container = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 20px;
  border-radius: 4px;
  width: 500px;
  background: rgb(54, 57, 63);
  > h1 {
    font-size: 1.5rem;
    align-self: center;
  }
  > h2 {
    margin-top: 5px;
    color: rgb(114, 118, 125);
    font-size: 1rem;
    align-self: center;
  }
  > form {
    margin-top: 15px;
    width: 100%;
  }
  > form > label {
    width: 100%;
    margin-bottom: 5px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.65rem;
    color: rgb(185, 187, 190);
  }
  > form > input {
    width: 100%;
    padding: 7px 10px;
    color: white;
    margin-top: 5px;
    font-size: 1rem;
    background: rgb(49, 51, 57);
    border: 1px solid rgb(34, 36, 40);
    border-radius: 5px;
    outline: none;
    &:focus {
      border: 1px solid rgb(113, 135, 221);
    }
  }
  > form > button {
    width: 100%;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
    background: rgb(113, 135, 221);
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    padding: 14px 10px;
  }

  > h3 {
    color: rgb(102, 119, 189);
    font-size: 0.7rem;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const HomeScreen = () => {
  return (
    <Container>
      <Switch>
        <Route path="/register">
          <FormWrapper>
            <h1>Fill up fields to register!</h1>
            <form>
              <label>Username</label>
              <input />
              <label>Email</label>
              <input />
              <label>Password</label>
              <input type="password" />
              <label>Confirm password</label>
              <input type="password" />
              <button>Register</button>
            </form>
            <h3 onClick={() => history.push("/")}>Already have an account</h3>
          </FormWrapper>
        </Route>
        <Route path="/">
          <FormWrapper>
            <h1>Welcome back!</h1>
            <h2>We're so excited to see you again!</h2>
            <form>
              <label>Username</label>
              <input />
              <label>Password</label>
              <input type="password" />
              <button>Login</button>
            </form>
            <h3 onClick={() => history.push("/register")}>
              Register an account
            </h3>
          </FormWrapper>
        </Route>
      </Switch>
    </Container>
  );
};

export default HomeScreen;
