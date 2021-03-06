import React from "react";
import styled, { css } from "styled-components";
import { Spinner } from "./Spinner";

const baseStyle = css`
  width: ${(props) => props.fluid && "100%"};
  font-size: 0.8rem;
  font-weight: bold;
  height: 48px;
  color: white;
  background-color: ${props => props.danger ? "#f04747" : "#7187dd"};
  background-color: ${props => props.transparent && "transparent"};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  padding: 5px 30px;
`;

const StyledButton = styled.button`
  ${baseStyle};
`;

const SpinnerWrapper = styled.div`
  ${baseStyle};
  display: grid;
  place-items: center;
`;

const Button = (props) => {
  return props.loading ? (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ) : (
    <StyledButton {...props}>{props.children}</StyledButton>
  );
};

export default Button;
