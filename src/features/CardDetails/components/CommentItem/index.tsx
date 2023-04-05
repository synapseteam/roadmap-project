import React, { FC } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { User } from "firebase/auth";

import { useAppSelector } from "../../../../app/hooks";
import UserIcon from "../../../../components/UserIcon";
import { UserType } from "../../../../types";
import Button from "../../../../ui/Button";
import { parseISOString } from "../../../../utils/helpers";

import styles from "./CommentItem.module.scss";

type Props = {
  author: User | UserType;
  text: string;
  createdAt: string;
};

const CommentItem: FC<Props> = ({ author, text, createdAt }): JSX.Element => {
  const userAuth = useAppSelector((state) => state.auth.user);
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentItem__author_container}>
        <UserIcon user={author} />
        <span className={styles.commentItem__date}>
          {parseISOString(createdAt)}
        </span>
      </div>
      <div className={styles.commentItem__content}>
        <span className={styles.commentItem__text}>{text}</span>
        <div className={styles.commentItem__buttons_container}>
          <Button icon={faHeart} variant="text" title="0" />
          {userAuth && (
            <>
              &#183; <Button variant="text" title="Reply" />
            </>
          )}
          {userAuth && userAuth.email === author.email && (
            <>
              &#183; <Button variant="text" title="Edit" /> &#183;{" "}
              <Button variant="text" title="Delete" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
