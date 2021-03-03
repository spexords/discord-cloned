import React from "react";
import { FormWrapper } from "../common/FormWrapper";
import Button from "../common/Button";
import { createSubchannel, selectChannelState } from "../stores/channelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Error from "../common/Error";

const NewSubchannelForm = () => {
  const dispatch = useDispatch();
  const { loading, error, selectedChannel } = useSelector(selectChannelState);
  const { register, handleSubmit } = useForm();
  const onSubmit = (values) => {
    const subchannel = {
      ...values,
      id: uuidv4(),
    };
    dispatch(createSubchannel({id: selectedChannel?.id, subchannel}));
  };

  return (
    <FormWrapper>
      <h2>Create subchannel</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input name="name" ref={register} />
        {error && <Error>{error}</Error>}
        <Button fluid type="submit" loading={loading ? 1 : 0}>
          Submit
        </Button>
      </form>
    </FormWrapper>
  );
};

export default NewSubchannelForm;
