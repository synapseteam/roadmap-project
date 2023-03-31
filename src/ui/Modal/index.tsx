import React, { FC } from "react";
import ReactDOM from "react-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PT from "prop-types";

import Button from "../Button";

import styles from "./Modal.module.scss";

const propTypes = {
  children: PT.oneOfType([PT.string, PT.element]),
  isOpen: PT.bool.isRequired,
  onClose: PT.func.isRequired,
  title: PT.string,
  subTitle: PT.string,
};

type Props = PT.InferProps<typeof propTypes>;

const Modal: FC<Props> = ({
  isOpen,
  onClose,
  children,
  title,
  subTitle,
}): JSX.Element | null => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.modal__overlay}
      onClick={() => onClose()}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <Button
          className={styles.modal__close}
          onClick={onClose}
          icon={faXmark}
        />
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = propTypes;

export default Modal;
