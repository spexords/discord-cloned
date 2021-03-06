import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import ConfirmForm from "../common/ConfirmForm";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import {
  leaveChannel,
  selectChannelState,
  changePasswordChannel,
  resetChannelErrors,
} from "../stores/channelSlice";
import { closeModal, openModal } from "../stores/modalSlice";
import { selectUserState } from "../stores/userSlice";
import ChangeChannelPasswordForm from "./ChangeChannelPasswordForm";

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

const ChannelMenu = ({ closeCallback, trigger }) => {
  const { selectedChannel } = useSelector(selectChannelState);
  const { user } = useSelector(selectUserState);
  const dispatch = useDispatch();
  const ref = useRef();
  useOnClickOutside(ref, true, () => closeCallback(), trigger);

  const handleLeaveChannel = () => {
    closeCallback();
    dispatch(
      openModal(
        <ConfirmForm
          header={`Leaving "${selectedChannel?.name}"`}
          content="Do you really want to leave this channel?"
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
          header={`Deleting "${selectedChannel?.name}"`}
          content="Do you really want to delete this channel?"
          confirmCallback={() =>
            dispatch(changePasswordChannel(selectedChannel?.id)).then((r) => {
              if (!r.error) {
                dispatch(closeModal());
                toast.dark("You deleted the channel");
              }
            })
          }
          declineCallback={() => dispatch(closeModal())}
        />
      )
    );
  };

  const handleChangePassword = () => {
    closeCallback();
    dispatch(resetChannelErrors())
    dispatch(
      openModal(
       <ChangeChannelPasswordForm/>
      )
    );
  };

  return (
    <Wrapper ref={ref}>
      {user.id === selectedChannel?.creatorId && (
        <>
          <Option onClick={handleChangePassword}>Change password</Option>
          <Option onClick={handleDeleteChannel}>Delete channel</Option>
        </>
      )}
      <Option onClick={handleLeaveChannel}>Leave channel</Option>
    </Wrapper>
  );
};

export default ChannelMenu;
