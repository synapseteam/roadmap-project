import React, { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendar,
  faEnvelope,
  faLightbulb,
} from "@fortawesome/free-regular-svg-icons";
import classnames from "classnames";

import Logo from "../../assets/synapseteam-whitelogo.png";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ModalForm from "../ModalForm";

import styles from "./Header.module.scss";

const Header: FC = (): JSX.Element => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isFormShow, setIsFormShow] = useState(false);

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
      <div>
        <Button
          variant="text"
          size="small"
          title="Login / Signup"
          className={styles.header__btn}
          onClick={() => setIsOpen(true)}
        />
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
                    ? "Already have an account? Log in"
                    : "Need an account? Sign up"
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
