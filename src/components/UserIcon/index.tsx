import React, { FC } from "react";
import classNames from "classnames";
import { User } from "firebase/auth";

import { UserType } from "../../types";

import styles from "./UserIcon.module.scss";

type Props = {
  user: User | UserType;
  isImageOnly?: boolean;
  className?: string;
};

const UserIcon: FC<Props> = ({
  user,
  className,
  isImageOnly = false,
}): JSX.Element => {
  return (
    <div className={classNames(styles.userIcon__container, className)}>
      <div className={styles.userIcon}>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className={styles.userIcon__img}
          />
        ) : (
          <span>
            {user.displayName
              ? user.displayName.charAt(0).toUpperCase()
              : user.email?.split("@")[0].charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {!isImageOnly && (
        <span className={styles.userIcon__author}>
          {user.displayName ? user.displayName : user.email?.split("@")[0]}
        </span>
      )}
    </div>
  );
};

export default UserIcon;
