import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { FormWrapper } from "../common/FormWrapper";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  createChannel,
  joinChannel,
  selectChannelState,
} from "../stores/channelSlice";
import Error from "../common/Error";
import { closeModal } from "../stores/modalSlice";
import styled from "styled-components";

const CreateOptionWrapper = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 15px;
`;

const Option = styled.h2`
  color: ${(props) => (props.selected ? "#aeb2b9" : "#72767d")};
  font-size: 1rem;
  padding-bottom: 2px;
  padding: 0 3px;
  border-bottom: ${(props) => (props.selected ? "2px solid white" : "none")};
  margin-right: 16px;
`;

const NewChannelForm = () => {
  const dispatch = useDispatch();
  const [currentOption, setCurrentOption] = useState("new");
  const { loading, error } = useSelector(selectChannelState);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (values) => {
    if (currentOption === "new") {
      const channel = {
        ...values,
        id: uuidv4(),
      };
      dispatch(createChannel(channel));
    } else {
      dispatch(joinChannel(values));
    }
  };

  return (
    <FormWrapper>
      <CreateOptionWrapper>
        <Option
          selected={currentOption === "new"}
          onClick={() => setCurrentOption("new")}
        >
          New channel
        </Option>
        <Option
          selected={currentOption === "join"}
          onClick={() => setCurrentOption("join")}
        >
          Join channel
        </Option>
      </CreateOptionWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input name="name" ref={register} />
        <label>Password</label>
        <input type="password" name="password" ref={register} />
        {currentOption === "new" && (
          <>
            <label>Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              ref={register({
                validate: (value) => value === watch("password"),
              })}
            />
          </>
        )}
        {error && <Error>{error}</Error>}

        {errors.confirmPassword && <Error>Passwords do not match</Error>}
        <Button fluid loading={loading ? 1 : 0} type="submit">
          Submit
        </Button>
      </form>
    </FormWrapper>
  );
};

export default NewChannelForm;
