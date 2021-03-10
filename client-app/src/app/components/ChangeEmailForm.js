import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../common/Button";
import { FormWrapper } from "../common/FormWrapper";
import { closeModal } from "../stores/modalSlice";
import { selectUserState, updateAccount } from "../stores/userSlice";
import Error from "../common/Error";

const ChangeEmailForm = () => {
  const { user, loading, error } = useSelector(selectUserState);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({ defaultValues: user });

  const onSubmit = (values) => {
    dispatch(updateAccount(values)).then((r) => {
      if (!r.error) {
        dispatch(closeModal());
        toast.dark("Email changed");
      }
    });
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input name="email" ref={register} />
        {error && <Error>{error}</Error>}
        <Error />
        <Button fluid loading={loading ? 1 : 0} type="submit">
          Change
        </Button>
      </form>
    </FormWrapper>
  );
};

export default ChangeEmailForm;
