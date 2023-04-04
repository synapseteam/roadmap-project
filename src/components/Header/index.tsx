import React, { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendar,
  faEnvelope,
  faLightbulb,
} from "@fortawesome/free-regular-svg-icons";
import classnames from "classnames";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setError, setLoading, setUser } from "../../app/slices/authSlice";
import Logo from "../../assets/synapseteam-whitelogo.png";
import { app } from "../../firebase";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ModalForm from "../ModalForm";
import UserIcon from "../UserIcon";

import styles from "./Header.module.scss";

const Header: FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const auth = getAuth(app);
  const userAuth = useAppSelector((state) => state.auth.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isFormShow, setIsFormShow] = useState(false);

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
          <>
            <UserIcon name={userAuth?.displayName ?? "U"} />
            <Button
              variant="text"
              size="small"
              title="Sign out"
              className={styles.header__btn}
              onClick={handleLogout}
            />
          </>
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
            <span>
              {isLogin && !isFormShow && "We use Noora to collect feedback"}
              {!isLogin && !isFormShow && ""}
            </span>
          </div>
          <div className={styles.header__modal_bodyContainer}>
            {isFormShow && (
              <ModalForm
                isEmail={isEmail}
                isLogin={isLogin}
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
          <div className={styles.header__modal_footer}>
            {isFormShow ? (
              <Button
                variant="text"
                size="default"
                title="Forgot your password?"
                onClick={() => setIsEmail(!isEmail)}
              />
            ) : (
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
            )}
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
