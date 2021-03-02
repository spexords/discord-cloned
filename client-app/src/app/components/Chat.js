import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectChannelState,
  sendMsgToSubchannel,
} from "../stores/channelSlice";
import UserMessage from "./UserMessage";
import { format } from "date-fns";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  overflow: hidden;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const MessageInput = styled.input`
  margin-top: 20px;
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
  const { selectedSubchannel } = useSelector(selectChannelState);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(
        sendMsgToSubchannel({ id: selectedSubchannel?.id, content: content })
      );
      setContent("");
    }
  };
  return (
    <Container>
      <MessageList>
        {selectedSubchannel?.messages?.map((msg) => (
          <UserMessage
            key={msg.id}
            image="./assets/icons/discord-icon.png"
            name={msg.sender}
            date={format(new Date(msg.date), "HH:mm dd-MM-yyyy")}
            content={msg.content}
          />
        ))}
      </MessageList>
      <MessageInput
        placeholder={`Type to #${selectedSubchannel?.name || ""}`}
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
    </Container>
  );
};

export default Chat;
