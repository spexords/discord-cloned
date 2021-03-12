import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteMsgFromSubchannel, selectChannelState } from "../stores/channelSlice";
import { selectUserState } from "../stores/userSlice";
import DefaultAvatar from "./DefaultAvatar";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-right: 4px;
  padding: 4px 15px;
  margin-bottom: 8px;
  color: white;
  &:hover {
    background-color: #32353b;
  }
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

const DeleteButton = styled.img`
  margin-left: auto;
  height: 20px;
  object-fit: contain;
`;

const UserMessage = ({ id, image, sender, date, content }) => {
  const { user } = useSelector(selectUserState);
  const { selectedChannel } = useSelector(selectChannelState);
  const [hovered, setHovered] = useState(false);
  const [binClickedOnce, setBinClickedOnce] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setBinClickedOnce(false);
  }, [hovered]);

  const handleBinClick = () => {
    if (binClickedOnce) {
      dispatch(deleteMsgFromSubchannel(id))
    }
    setBinClickedOnce(true);
  };
  return (
    <Container
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <DefaultAvatar image={image} />
      <MessageWrapper>
        <NameWrapper>
          <h1>{sender}</h1>
          <p>{date}</p>
        </NameWrapper>
        <p>{content}</p>
      </MessageWrapper>
      {hovered &&
        (user.username === sender ||
          user?.id === selectedChannel?.creatorId) && (
          <DeleteButton
            onClick={handleBinClick}
            alt="trash"
            src={`./assets/icons/${
              !binClickedOnce ? "trash" : "trash-red"
            }.svg`}
          />
        )}
    </Container>
  );
};

export default UserMessage;
