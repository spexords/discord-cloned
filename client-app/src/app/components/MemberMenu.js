import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import ConfirmForm from "../common/ConfirmForm";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { kickUserChannel, selectChannelState } from "../stores/channelSlice";
import { closeModal, openModal } from "../stores/modalSlice";

const Wrapper = styled.div`
  position: absolute;
  top: 25px;
  left: 10px;
  background-color: #18191c;
  z-index: 5;
  padding: 10px;
  width: calc(100% - 10px);
  display: flex;
  border-radius: 5px;
  flex-direction: column;
`;

const Option = styled.div`
  font-size: 0.8rem;
  padding: 8px;
  color: #aaaaaa;
  border-radius: 5px;
  &:hover {
    background-color: #5c6fb1;
    color: white;
  }
`;

const MemberMenu = ({ id, name, trigger, closeCallback }) => {
  const ref = useRef();
  const { selectedChannel } = useSelector(selectChannelState);
  useOnClickOutside(ref, true, () => closeCallback(), trigger);
  const dispatch = useDispatch();
  const handleUserKick = () => {
    dispatch(
      openModal(
        <ConfirmForm
          header={`Kicking "${name}"`}
          content={`Do you really want to kick this user?`}
          declineCallback={() => dispatch(closeModal())}
          confirmCallback={() =>
            dispatch(
              kickUserChannel({ cid: selectedChannel?.id, uid: id })
            ).then((r) => {
              if (!r.error) {
                dispatch(closeModal());
                toast.dark(`${name} was kicked`);
              }
            })
          }
        />
      )
    );
  };
  return (
    <Wrapper ref={ref}>
      <Option onClick={handleUserKick}>Kick {name}</Option>
    </Wrapper>
  );
};

export default MemberMenu;
