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

import styles from "./Header.module.scss";

const Header: FC = (): JSX.Element => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.header__menu}>
        <Button href="/" size="default">
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
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Sign up to post and vote"
        subTitle="We use Noora to collect feedback"
      >
        <div className={styles.header__modal}>
          <Button
            icon={faEnvelope}
            iconSize={20}
            size="default"
            variant="outlined"
            className={styles.header__modal_btn}
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
      </Modal>
    </header>
  );
};

export default Header;
