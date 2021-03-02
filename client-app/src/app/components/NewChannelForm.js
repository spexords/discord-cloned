import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { FormWrapper } from "../common/FormWrapper";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { createChannel, selectChannelState } from "../stores/channelSlice";
import Error from "../common/Error";
import { closeModal } from "../stores/modalSlice";

const NewChannelForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectChannelState);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (values) => {
    const channel = {
      ...values,
      id: uuidv4(),
    };
    dispatch(createChannel(channel));
    dispatch(closeModal());
  };

  return (
    <FormWrapper>
      <h1>New channel</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input name="name" ref={register} />
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
        {error && <Error>{error}</Error>}

        {errors.confirmPassword && <Error>Passwords do not match</Error>}
        <Button fluid loading={loading ? 1 : 0} type="submit">
          Create
        </Button>
      </form>
    </FormWrapper>
  );
};

export default NewChannelForm;
