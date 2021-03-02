import React from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { FormWrapper } from "../common/FormWrapper";

const NewChannelForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (values) => {};
  return (
    <FormWrapper>
      <h1>New channel</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Channel name</label>
        <input name="name" ref={register} />
        <label>Channel password</label>
        <input type="password" name="password" ref={register} />
        <Button fluid type="submit">Create</Button>
      </form>
    </FormWrapper>
  );
};

export default NewChannelForm;
