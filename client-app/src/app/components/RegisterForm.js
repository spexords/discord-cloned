import React, { useState } from "react";
import { history } from "../..";
import Button from "../common/Button";
import { FormWrapper } from "../common/FormWrapper";
import Error from "../common/Error";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser, selectUserState } from "../stores/userSlice";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const { loading, error } = useSelector(selectUserState);
  const onSubmit = (values) => {
    dispatch(registerUser(values)).then((r) => {
      if (!r.error) {
        history.push("/");
        toast.dark("Account created")
      }
    });
  };
  return (
    <FormWrapper>
      <h1>Fill up fields to register!</h1>
      <form style={{ marginTop: "15px" }} onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input name="username" ref={register} />
        <label>Email</label>
        <input name="email" ref={register} />
        <label>Password</label>
        <input type="password" name="password" ref={register} />
        <label>Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          ref={register({
            validate: (value) => value === watch("password"),
          })}
        />
        {errors.confirmPassword && <Error>Passwords do not match</Error>}
        {error && <Error>{error}</Error>}
        <Button fluid loading={loading ? 1 : 0} type="submit">
          Register
        </Button>
        <h3 onClick={() => history.push("/")}>Already have an account</h3>
      </form>
    </FormWrapper>
  );
};

export default RegisterForm;
