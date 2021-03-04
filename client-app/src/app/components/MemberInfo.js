import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  > p {
    margin-left: 5px;
    font-size: 0.8rem;
  } 
  > img {
    object-fit: contain;
    height: 16px;
    margin-left: 5px;
  }
`;

const MemberInfo = ({ image, name, isHost }) => {
  return (
    <Container>
      <Avatar image={image} />
      <p>{name}</p>
      {isHost && (<img src="./assets/icons/crown.svg"/>)}
    </Container>
  );
};

export default MemberInfo;
