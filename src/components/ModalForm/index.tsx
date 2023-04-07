import React, { Dispatch, FC, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as yup from "yup";

import { useAppDispatch } from "../../app/hooks";
import { setError, setLoading, setUser } from "../../app/slices/authSlice";
import { app } from "../../firebase";
import Button from "../../ui/Button";
import FormInput from "../../ui/Form/FormInput";

import styles from "./ModalForm.module.scss";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});

type ModalFormType = {
  email: string;
  password: string;
};

type Props = {
  isLogin: boolean;
  setIsForm: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalForm: FC<Props> = ({
  isLogin,
  setIsForm,
  setIsOpen,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = getAuth(app);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ModalFormType>({
    resolver: yupResolver(schema),
  });

  const handleSignupWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    dispatch(setLoading(true));
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(user));
      dispatch(setError(null));
      toast.success("You have signed up");
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
        toast.error(error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLoginWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    dispatch(setLoading(true));
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(user));
      dispatch(setError(null));
      toast.success("You have signed in");
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
        toast.error(error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const submitForm = (data: ModalFormType) => {
    if (isLogin) {
      handleLoginWithEmailAndPassword(data.email, data.password);
    } else {
      handleSignupWithEmailAndPassword(data.email, data.password);
    }
    setIsOpen(false);
    setIsForm(false);
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
      <FormInput
        name="password"
        placeholder="Password"
        error={errors.password}
        control={control}
      />
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
