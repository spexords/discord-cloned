import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import UserMessage from "./UserMessage";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MessageInput = styled.input`
  height: 50px;
  margin-bottom: 10px;
  border-radius: 10px;
  outline: none;
  border: none;
  font-size: 0.9rem;
  padding: 0 15px;
  background-color: rgb(64, 68, 75);
  color: white;
  :placeholer {
    color: rgb(109, 113, 122);
  }
`;

const Chat = () => {
  return (
    <Container>
      <MessageList>
        <UserMessage
          image="./assets/icons/discord-icon.png"
          name="Andrzejek"
          date="13:22 22-01-2020"
          content="How youuu doing ??"
        />
        <UserMessage
          image="./assets/icons/discord-icon.png"
          name="Andrzejek"
          date="13:22 22-01-2020"
          content="How youuu doing ??"
        />
        <UserMessage
          image="./assets/icons/discord-icon.png"
          name="Andrzejek"
          date="13:22 22-01-2020"
          content="How youuu doing ??"
        />
        <UserMessage
          image="./assets/icons/discord-icon.png"
          name="Andrzejek"
          date="13:22 22-01-2020"
          content="How youuu doing ??"
        />
        <UserMessage
          image="./assets/icons/discord-icon.png"
          name="Andrzejek"
          date="13:22 22-01-2020"
          content="How youuu doing ??"
        />
        <UserMessage
          image="./assets/icons/discord-icon.png"
          name="Andrzejek"
          date="13:22 22-01-2020"
          content="How youuu doing ??"
        />
        <UserMessage
          image="./assets/icons/discord-icon.png"
          name="Andrzejek"
          date="13:22 22-01-2020"
          content="How youuu doing ??"
        />
      </MessageList>
      <MessageInput placeholder="Napisz na #Jazda cs" />
    </Container>
  );
};

export default Chat;
