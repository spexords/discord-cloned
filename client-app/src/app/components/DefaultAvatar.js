import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  place-items: center;
  border-radius: 100%;
  padding: 5px;
  height: ${(props) => (props.big ? "70px" : "40px")};
  width: ${(props) => (props.big ? "70px" : "40px")};
  background: ${(props) => (props.background ? props.background : "#747f8d")};
  > img {
    height: ${(props) => (props.big ? "40px" : "20px")};
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
