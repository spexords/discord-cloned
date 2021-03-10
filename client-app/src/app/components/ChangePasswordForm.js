import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../common/Button";
import { FormWrapper } from "../common/FormWrapper";
import { closeModal } from "../stores/modalSlice";
import { selectUserState, updatePassword } from "../stores/userSlice";
import Error from "../common/Error";

const ChangePasswordForm = () => {
  const { loading, error } = useSelector(selectUserState);
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(updatePassword(values)).then((r) => {
      if (!r.error) {
        dispatch(closeModal());
        toast.dark("Password changed");
      }
    });
  };
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Current password</label>
        <input type="password" name="currentPassword" ref={register} />
        <label>New password</label>
        <input type="password" name="newPassword" ref={register} />
        <label>Confirm new password</label>
        <input
          type="password"
          name="confirmPassword"
          ref={register({
            validate: (value) => value === watch("newPassword"),
          })}
        />
        {error && <Error>{error}</Error>}
        {errors.confirmPassword && <Error>Passwords do not match</Error>}
        <Button fluid loading={loading ? 1 : 0} type="submit">
          Change
        </Button>
      </form>
    </FormWrapper>
  );
};

export default ChangePasswordForm;
