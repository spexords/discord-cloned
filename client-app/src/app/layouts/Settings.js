import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout, selectUserState } from "../stores/userSlice";
import Button from "../common/Button";
import Separator from "../common/Separator";
import EditAvatar from "../components/EditAvatar";
import ChangeEmailForm from "../components/ChangeEmailForm";
import { openModal } from "../stores/modalSlice";
import ChangePasswordForm from "../components/ChangePasswordForm";

const Container = styled.div`
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgb(47, 49, 54);
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 60px;
  width: 650px;
`;

const SectionHeader = styled.h1`
  color: white;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const EditFieldWrapper = styled.div`
  padding: 10px 0px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    color: #878b90;
    font-size: 0.7rem;
    text-transform: uppercase;
  }
  p {
    color: white;
    font-size: 1rem;
  }
`;

const EditButton = styled(Button)`
  margin: 0;
  padding: 0px 30px;
  color: white;
  background-color: rgb(116, 127, 141);
`;

const CloseButton = styled.img`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 35px;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 100%;
  object-fit: contain;
  border: 1px solid white;
`;

const AvatarNameWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  align-items: center;
  flex-direction: row;
  h2 {
    font-size: 1.4rem;
  }
  small {
    font-size: 1.2rem;
    color: #878b90;
  }
`;

const Settings = ({ closeCallback }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUserState);
  return (
    <Container>
      <Wrapper>
        <CloseButton src="./assets/icons/close.svg" onClick={closeCallback} />
        <SectionHeader>My account</SectionHeader>
        <EditFieldWrapper>
          <AvatarNameWrapper>
            <EditAvatar />
            <h2>
              {user?.username}
              <small>#{user?.id.slice(-4)}</small>
            </h2>
          </AvatarNameWrapper>
          <EditButton>Edit</EditButton>
        </EditFieldWrapper>
        <Separator color="#42454a" />
        <EditFieldWrapper>
          <OptionWrapper>
            <h3>Email</h3>
            <p>{user?.email}</p>
          </OptionWrapper>
          <EditButton onClick={() => dispatch(openModal(<ChangeEmailForm />))}>
            Edit
          </EditButton>
        </EditFieldWrapper>
        <Separator color="#42454a" />
        <EditFieldWrapper>
          <OptionWrapper>
            <h3>Password</h3>
            <p>*****</p>
          </OptionWrapper>
          <EditButton onClick={() => dispatch(openModal(<ChangePasswordForm />))}>
            Edit
          </EditButton>
        </EditFieldWrapper>
        <Separator color="#42454a" />
        <Button danger onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Settings;
