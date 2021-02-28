import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  color: white;
`;
const MessageWrapper = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  > p {
    font-size: 0.8rem;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  > h1 {
    font-size: 0.8rem;
  }
  > p {
    margin-left: 5px;
    color: rgb(114, 116, 121);
    font-size: 0.65rem;
  }
`;

const UserMessage = ({ image, name, date, content }) => {
  return (
    <Container>
      <Avatar image={image} />
      <MessageWrapper>
        <NameWrapper>
          <h1>{name}</h1>
          <p>{date}</p>
        </NameWrapper>
        <p>{content}</p>
      </MessageWrapper>
    </Container>
  );
};

export default UserMessage;
