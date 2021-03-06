import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../common/Button";
import Error from "../common/Error";
import { FormWrapper } from "../common/FormWrapper";
import {
  changePasswordChannel,
  selectChannelState,
} from "../stores/channelSlice";
import { closeModal } from "../stores/modalSlice";

const ChangeChannelPasswordForm = () => {
  const dispatch = useDispatch();
  const { loading, error, selectedChannel } = useSelector(selectChannelState);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (values) => {
    dispatch(changePasswordChannel({ id: selectedChannel?.id, values })).then(
      (r) => {
        if (!r.error) {
          dispatch(closeModal());
          toast.dark("Channel password updated");
        }
      }
    );
  };
  return (
    <FormWrapper>
      <h2>Change channel password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Current password</label>
        <input type="password" name="currentPassword" ref={register} />
        <label>New password</label>
        <input type="password" name="newPassword" ref={register} />
        <label>Confirm new password</label>
        <input
          type="password"
          name="confirmNewPassword"
          ref={register({
            validate: (value) => value === watch("newPassword"),
          })}
        />
        {error && <Error>{error}</Error>}

        {errors.confirmPassword && <Error>Passwords do not match</Error>}

        <Button fluid type="submit" loading={loading ? 1 : 0}>
          Submit
        </Button>
      </form>
    </FormWrapper>
  );
};

export default ChangeChannelPasswordForm;
