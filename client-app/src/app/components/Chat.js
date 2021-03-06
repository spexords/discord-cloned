import React, { useEffect, useRef, useState } from "react";
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
  overflow: hidden;
  padding: 15px 0;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  margin-right: 4px;
  margin-bottom: 5px;
`;

const MessageInput = styled.input`
  margin: 0 10px;
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
  const messagesEndRef = useRef();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedSubchannel?.messages]);

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
            id={msg.id}
            image="./assets/icons/discord-icon.png"
            sender={msg.sender}
            date={format(new Date(msg.date), "HH:mm dd-MM-yyyy")}
            content={msg.content}
          />
        ))}
        <div ref={messagesEndRef} />
      </MessageList>
      <MessageInput
        placeholder={`Type to #${selectedSubchannel?.name || ""}`}
        value={content}
        disabled={selectedSubchannel === null}
        onChange={(e) => setContent(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
    </Container>
  );
};

export default Chat;
