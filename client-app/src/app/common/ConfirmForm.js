import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { FormWrapper } from "./FormWrapper";

const ButtonWrapper = styled.div`
  display: flex;
  justify-items: space-between;
  margin-left: auto;
`;

const ConfirmForm = ({ text, confirmCallback, declineCallback }) => {
  return (
    <FormWrapper>
      <h1>{text}</h1>
      <ButtonWrapper>
        <Button
          style={{ marginRight: "20px" }}
          onClick={() => confirmCallback()}
        >
          Yes
        </Button>
        <Button onClick={() => declineCallback()}>No</Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default ConfirmForm;
