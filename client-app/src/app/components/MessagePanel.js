import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectChannelState } from "../stores/channelSlice";
import Chat from "./Chat";
import MemberList from "./MemberList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(54, 57, 63);
  overflow: hidden;
  flex: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  flex-direction: row;
  cursor: pointer;
  padding: 0px 15px;
  border-bottom: 1px solid rgb(35, 37, 39);
  align-items: center;
  > img {
    height: 18px;
    object-fit: contain;
  }
  > h3 {
    margin-left: 10px;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  flex: 1;
`;

const MessagePanel = () => {

  const { selectedSubchannel } = useSelector(selectChannelState);

  return (
    <Container>
      <HeaderContainer>
        {selectedSubchannel && (
          <>
            <img src="./assets/icons/hash-tag.svg" alt="hash" />
            <h3>{selectedSubchannel.name}</h3>
          </>
        )}
      </HeaderContainer>
      <MainContainer>
        <Chat />
        <MemberList />
      </MainContainer>
    </Container>
  );
};

export default MessagePanel;
