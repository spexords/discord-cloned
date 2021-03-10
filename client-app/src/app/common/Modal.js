import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { closeModal, selectModalState } from "../stores/modalSlice";

const Conatiner = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 15;
  background-color: rgba(0, 0, 0, 0.9);
  visibility: ${(props) => (props.opened ? "visible" : "hidden")};
`;

const Modal = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { opened, body } = useSelector(selectModalState);
  useOnClickOutside(ref, opened, () => dispatch(closeModal()));
  return (
    <Conatiner opened={opened}>
      <div ref={ref}>{body}</div>
    </Conatiner>
  );
};

export default Modal;
