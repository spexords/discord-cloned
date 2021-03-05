import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import ConfirmForm from "../common/ConfirmForm";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import {
  leaveChannel,
  selectChannelState,
  deleteChannel,
} from "../stores/channelSlice";
import { closeModal, openModal } from "../stores/modalSlice";
import { selectUserState } from "../stores/userSlice";

const Wrapper = styled.div`
  position: absolute;
  cursor: pointer;
  background-color: #18191c;
  z-index: 5;
  padding: 10px;
  width: calc(100% - 14px);
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

const ChannelMenu = ({ closeCallback }) => {
  const { selectedChannel } = useSelector(selectChannelState);
  const { user } = useSelector(selectUserState);
  const dispatch = useDispatch();
  const ref = useRef();
  useOnClickOutside(ref, true, () => closeCallback());

  const handleLeaveChannel = () => {
    closeCallback();
    dispatch(
      openModal(
        <ConfirmForm
          text={`Do you really want to leave ${selectedChannel?.name} channel?`}
          confirmCallback={() =>
            dispatch(leaveChannel(selectedChannel?.id)).then((r) => {
              if (!r.error) {
                dispatch(closeModal());
                toast.dark("You left the channel");
              }
            })
          }
          declineCallback={() => dispatch(closeModal())}
        />
      )
    );
  };

  const handleDeleteChannel = () => {
    closeCallback();
    dispatch(
      openModal(
        <ConfirmForm
          text={`Do you really want to remove ${selectedChannel?.name} channel?`}
          confirmCallback={() =>
            dispatch(deleteChannel(selectedChannel?.id)).then((r) => {
              if (!r.error) {
                dispatch(closeModal());
                toast.dark("You removed the channel");
              }
            })
          }
          declineCallback={() => dispatch(closeModal())}
        />
      )
    );
  };

  return (
    <Wrapper ref={ref}>
      {user.id === selectedChannel?.creatorId && (
        <>
          <Option>Change password</Option>
          <Option onClick={handleDeleteChannel}>Delete channel</Option>
        </>
      )}
      <Option onClick={handleLeaveChannel}>Leave channel</Option>
    </Wrapper>
  );
};

export default ChannelMenu;
