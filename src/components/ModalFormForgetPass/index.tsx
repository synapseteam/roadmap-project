import React, { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import * as yup from "yup";

import { app } from "../../firebase";
import Button from "../../ui/Button";
import FormInput from "../../ui/Form/FormInput";

import styles from "../ModalForm/ModalForm.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

type FormResetPass = {
  email: string;
};

type Props = {
  setIsForm: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEmail: Dispatch<SetStateAction<boolean>>;
};

const ModalFormForgetPass: FC<Props> = ({
  setIsForm,
  setIsOpen,
  setIsEmail,
}): JSX.Element => {
  const auth = getAuth(app);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormResetPass>({
    resolver: yupResolver(schema),
  });

  const handleCancelClick = () => {
    setIsEmail(false);
    setIsForm(false);
  };

  const submitForm = async (data: FormResetPass) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast.info(
        "We sent you an email with instructions how to reset your password"
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message.split("/").pop());
      }
    }
    console.log(data);
    reset();
    setIsOpen(false);
    setIsEmail(false);
    setIsForm(false);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.modalForm}>
      <span>
        Enter the email associated with your account. We will send you an email
        to reset your password.
      </span>
      <FormInput
        name="email"
        placeholder="Email"
        error={errors.email}
        control={control}
      />
      <div className={styles.modalForm__button}>
        <Button
          variant="outlined"
          size="default"
          title="Cancel"
          onClick={handleCancelClick}
        />
        <Button variant="filled" size="default" title="Reset password" submit />
      </div>
    </form>
  );
};

export default ModalFormForgetPass;
