import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  place-items: center;
  border-radius: 100%;
  padding: 5px;
  height: 40px;
  width: 40px;
  background: ${(props) => (props.background ? props.background : "#747f8d")};
  > img {
    height: 20px;
    object-fit: contain;
  }
`;

const DefaultAvatar = (props) => {
  return (
    <Container {...props}>
      <img alt="default" src="./assets/icons/discord-icon.png" />
    </Container>
  );
};

export default DefaultAvatar;
