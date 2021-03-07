import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Settings from "../layouts/Settings";
import { logout, selectUserState } from "../stores/userSlice";
import DefaultAvatar from "./DefaultAvatar";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background: rgb(41, 43, 47);
  img {
  }
`;

const UsernameContainer = styled.div`
  display: flex;
  margin-left: 6px;
  flex-direction: column;
  > h1 {
    font-size: 0.8rem;
    color: white;
  }
  > p {
    font-size: 0.7rem;
    color: rgb(176, 178, 181);
  }
`;

const IconsWrapper = styled.div`
  margin-left: auto;
`;

const MenuIcon = styled.img`
  height: 25px;
  object-fit: contain;
`;

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUserState);
  const [settingsOpened, setSettingsOpened] = useState(false);
  if (settingsOpened) {
    return <Settings closeCallback={() => setSettingsOpened(false)} />;
  }
  return (
    <Container>
      <DefaultAvatar/>
      <UsernameContainer>
        <h1>{user.username}</h1>
        <p>#{user.id.slice(-4)}</p>
      </UsernameContainer>
      <IconsWrapper>
        <MenuIcon
          src="./assets/icons/settings.svg"
          onClick={() => setSettingsOpened(true)}
        />
      </IconsWrapper>
    </Container>
  );
};

export default UserInfo;
