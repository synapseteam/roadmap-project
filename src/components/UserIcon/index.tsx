import React, { FC } from "react";
import classNames from "classnames";

import styles from "./UserIcon.module.scss";

type Props = {
  name: string;
  className?: string;
};

const UserIcon: FC<Props> = ({ name, className }): JSX.Element => {
  return (
    <div className={classNames(styles.userIcon, className)}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserIcon;
