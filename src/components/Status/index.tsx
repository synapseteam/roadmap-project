import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Status.module.scss";

type Props = {
  status: string;
  isOutlined?: boolean;
};

const Status: FC<Props> = ({ status, isOutlined = false }): JSX.Element => {
  return (
    <div
      className={classNames(styles.status, {
        [styles.status__border]: isOutlined,
      })}
    >
      <div
        className={classNames(styles.status__icon, {
          [styles.status__iconRed]: status === "Pending",
          [styles.status__iconOrange]: status === "In progress",
          [styles.status__iconGreen]: status === "Shipped",
        })}
      />
      <span>{status}</span>
    </div>
  );
};

export default Status;
