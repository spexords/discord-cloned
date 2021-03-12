import React from "react";
import styled from "styled-components";
import DefaultAvatar from "./DefaultAvatar";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 100%;
  width: 80px;
  display: grid;
  place-items: center;
  height: 80px;
  background-color: #747f8d;
  img {
    position: relative;
    width: 100%;
    object-fit: fill;
  }
`;

const EditWrapper = styled.div`
    display: grid;
    place-items: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: rgb(220, 221, 222);
    img {
        width: 15px;
        object-fit: scale-down;
    }
`

const EditAvatar = () => {
  return (
    <Wrapper>
        <DefaultAvatar big/>
        <EditWrapper>
            <img alt="edit" src="./assets/icons/edit.svg"/>
        </EditWrapper>
    </Wrapper>
  );
};

export default EditAvatar;
