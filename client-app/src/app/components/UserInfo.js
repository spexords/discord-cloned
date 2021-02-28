import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const Container = styled.div`
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
    font-size: 0.8rem;
    color: rgb(176, 178, 181);
  }
`;

const UserInfo = () => {
  return (
    <Container>
      <Avatar image="./assets/icons/discord-icon.png" />
      <UsernameContainer>
        <h1>spexords</h1>
        <p>#{"5a28edc2-2d94-4bbe-80df-a7936c67b999".slice(-4)}</p>
      </UsernameContainer>
    </Container>
  );
};

export default UserInfo;
