import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { FormWrapper } from "./FormWrapper";

const ButtonWrapper = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const ConfirmForm = ({header, content, confirmCallback, declineCallback }) => {
  return (
    <FormWrapper>
      <h1>{header}</h1>
      <h2>{content}</h2>
      <ButtonWrapper>
        <Button
          danger
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
