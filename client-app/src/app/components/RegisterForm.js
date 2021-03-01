import React from "react";
import { history } from "../..";
import Button from "../common/Button";
import { FormWrapper } from "../common/FormWrapper";

const RegisterForm = () => {
  return (
    <FormWrapper>
      <h1>Fill up fields to register!</h1>
      <form style={{marginTop: "15px"}}>
        <label>Username</label>
        <input />
        <label>Email</label>
        <input />
        <label>Password</label>
        <input type="password" />
        <label>Confirm password</label>
        <input type="password" />
        <Button fluid>Register</Button>
        <h3 onClick={() => history.push("/")}>Already have an account</h3>
      </form>
    </FormWrapper>
  );
};

export default RegisterForm;
