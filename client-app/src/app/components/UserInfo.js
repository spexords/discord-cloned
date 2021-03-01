import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../stores/userSlice";
import Avatar from "./Avatar";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background: rgb(41, 43, 47);
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

const LogoutButton = styled.img`
  height: 25px;
  object-fit: contain;
  margin-left: auto;
`

const UserInfo = () => {
  const dispatch = useDispatch()
  return (
    <Container>
      <Avatar image="./assets/icons/discord-icon.png" />
      <UsernameContainer>
        <h1>spexords</h1>
        <p>#{"5a28edc2-2d94-4bbe-80df-a7936c67b999".slice(-4)}</p>
      </UsernameContainer>
      <LogoutButton src="./assets/icons/power-button.svg" onClick={() => dispatch(logout())}/>
    </Container>
  );
};

export default UserInfo;
