import React, { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ModalFormType } from "../../types";
import Button from "../../ui/Button";
import FormInput from "../../ui/Form/FormInput";

import styles from "./ModalForm.module.scss";

const schemaFull = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});

const schemaShort = yup.object().shape({
  email: yup.string().email().required(),
});

type ModalFormEmailType = {
  email: string;
};

type Props = {
  isLogin: boolean;
  isEmail: boolean;
  setIsForm: Dispatch<SetStateAction<boolean>>;
};

const ModalForm: FC<Props> = ({ isLogin, isEmail, setIsForm }): JSX.Element => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ModalFormType>({
    resolver: yupResolver(isEmail ? schemaShort : schemaFull),
  });

  const submitForm = (data: ModalFormType | ModalFormEmailType) => {
    console.log(data);
    reset(
      { email: "", password: "" },
      {
        keepValues: false,
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles.modalForm}>
      <FormInput
        name="email"
        placeholder="Email"
        error={errors.email}
        control={control}
      />
      {!isEmail && (
        <FormInput
          name="password"
          placeholder="Password"
          error={errors.password}
          control={control}
        />
      )}
      <div className={styles.modalForm__button}>
        <Button
          variant="outlined"
          size="default"
          title="Cancel"
          onClick={() => setIsForm(false)}
        />
        <Button
          variant="filled"
          size="default"
          title={isLogin ? "Log in" : "Sign up"}
          submit
        />
      </div>
    </form>
  );
};

export default ModalForm;
