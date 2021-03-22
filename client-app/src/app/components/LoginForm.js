import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../..";
import Button from "../common/Button";
import Error from "../common/Error";
import { FormWrapper } from "../common/FormWrapper";
import { resetChannelSlice } from "../stores/channelSlice";
import { login, resetErrors, selectUserState } from "../stores/userSlice";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(resetErrors())
  }, [])
  
  const onSubmit = (values) => {
    dispatch(resetChannelSlice())
    dispatch(login(values))
  };
  
  return (
    <FormWrapper>
      <h1>Welcome back!</h1>
      <h2 style={{ marginTop: "5px" }}>We're so excited to see you again!</h2>
      <form style={{ marginTop: "15px" }} onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input name="username" ref={register} />
        <label>Password</label>
        <input type="password" name="password" ref={register} />
        {error && <Error>{error}</Error>}
        <Button fluid type="submit" loading={loading ? 1 : 0}>
          Login
        </Button>
        <h3 onClick={() => history.push("/register")}>Register an account</h3>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
