import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendar,
  faEnvelope,
  faLightbulb,
} from "@fortawesome/free-regular-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setError, setLoading, setUser } from "../../app/slices/authSlice";
import Logo from "../../assets/synapseteam-whitelogo.png";
import { app } from "../../firebase";
import Button from "../../ui/Button";
import FormInput from "../../ui/Form/FormInput";
import Select from "../../ui/Form/Select";
import Modal from "../../ui/Modal";
import ModalForm from "../ModalForm";
import ModalFormForgetPass from "../ModalFormForgetPass";
import UserIcon from "../UserIcon";

import styles from "./Header.module.scss";

const schema = yup.object().shape({
  displayName: yup.string().max(20).required(),
});

type ProfileFormType = {
  displayName: string;
};

const Header: FC = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = getAuth(app);
  const userAuth = useAppSelector((state) => state.auth.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isFormShow, setIsFormShow] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      displayName: userAuth?.displayName ?? "",
    },
  });

  const handleChangeName = async (data: ProfileFormType) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, data);
        dispatch(setUser(auth.currentUser));
      }
      toast.success("You have changed your name");
      setIsProfileOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    reset(
      { displayName: auth.currentUser?.displayName ?? "" },
      {
        keepValues: false,
      }
    );
  };

  const handleLoginWithGoogle = async () => {
    dispatch(setLoading(true));
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      dispatch(setUser(user));
      dispatch(setError(null));
      toast.success("You have signed in");
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
        toast.error(error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await signOut(auth);
      dispatch(setUser(null));
      dispatch(setError(null));
      toast.success("You have signed out");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
        toast.error(error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const options = [
    {
      label: "Profile",
      value: "profile",
      onClick: () => setIsProfileOpen(true),
    },
    {
      label: "Sign out",
      value: "sign out",
      onClick: handleLogout,
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.header__menu}>
        <Button href="/" size="default" variant="text">
          <img src={Logo} alt="logo" className={styles.header__logo} />
        </Button>
        <div className={styles.header__navi}>
          <Button
            size="small"
            title="roadmap"
            variant="text"
            icon={faCalendar}
            iconSize={16}
            href="/"
            className={classnames(styles.header__navi_btn, {
              [styles.header__navi_btn_active]: location.pathname === "/",
            })}
          />
          <Button
            size="small"
            title="feature requests"
            variant="text"
            icon={faLightbulb}
            iconSize={16}
            href="/feature-requests"
            className={classnames(styles.header__navi_btn, {
              [styles.header__navi_btn_active]:
                location.pathname === "/feature-requests",
            })}
          />
        </div>
      </div>
      <div className={styles.header__user}>
        {userAuth !== null ? (
          <Select options={options} component={<UserIcon user={userAuth} />} />
        ) : (
          <Button
            variant="text"
            size="small"
            title="Login / Signup"
            className={styles.header__btn}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.header__modal}>
          <div className={styles.header__modal_headingContainer}>
            <span className={styles.header__modal_heading}>
              {isLogin && !isFormShow && "Log in to post and vote"}
              {!isLogin && !isFormShow && "Sign up to post and vote"}
              {isFormShow && `${isLogin ? "Log in" : "Sign up"} with email`}
            </span>
            <span className={styles.header__modal_subtitle}>
              {isLogin && !isFormShow && "We use Noora to collect feedback"}
              {!isLogin && !isFormShow && ""}
            </span>
          </div>

          <div className={styles.header__modal_bodyContainer}>
            {isFormShow && !isEmail && (
              <ModalForm
                isLogin={isLogin}
                setIsForm={setIsFormShow}
                setIsOpen={setIsOpen}
              />
            )}
            {isFormShow && isEmail && isLogin && (
              <ModalFormForgetPass
                setIsEmail={setIsEmail}
                setIsForm={setIsFormShow}
                setIsOpen={setIsOpen}
              />
            )}
            {!isFormShow && (
              <div className={styles.header__modal_body}>
                <Button
                  icon={faEnvelope}
                  iconSize={20}
                  size="default"
                  variant="outlined"
                  className={styles.header__modal_btn}
                  onClick={() => setIsFormShow(!isFormShow)}
                />
                <span>or</span>
                <Button
                  icon={faGoogle}
                  iconSize={20}
                  size="default"
                  variant="outlined"
                  className={styles.header__modal_btn}
                  onClick={handleLoginWithGoogle}
                />
              </div>
            )}
          </div>

          {isFormShow && !isEmail && isLogin && (
            <div className={styles.header__modal_footer}>
              <Button
                variant="text"
                size="default"
                title="Forgot your password?"
                onClick={() => setIsEmail(!isEmail)}
              />
            </div>
          )}
          {!isFormShow && (
            <div className={styles.header__modal_footer}>
              <Button
                variant="text"
                size="default"
                title={
                  isLogin
                    ? "Need an account? Sign up"
                    : "Already have an account? Log in"
                }
                onClick={() => setIsLogin(!isLogin)}
              />
            </div>
          )}
        </div>
      </Modal>
      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        <div className={styles.header__modal}>
          <div className={styles.header__modal_headingContainer}>
            <span className={styles.header__modal_heading}>Profile</span>
          </div>
          <form onSubmit={handleSubmit(handleChangeName)}>
            <div className={styles.header__modal_bodyContainer}>
              <FormInput
                name="displayName"
                placeholder="Name"
                error={errors.displayName}
                control={control}
              />
            </div>
            <div className={styles.header__modal_buttonContainer}>
              <Button
                title="Cancel"
                variant="outlined"
                onClick={() => setIsProfileOpen(false)}
              />
              <Button title="Save" variant="filled" submit />
            </div>
          </form>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
