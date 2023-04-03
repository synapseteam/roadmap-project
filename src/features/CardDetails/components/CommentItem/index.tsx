import React, { FC } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import UserIcon from "../../../../components/UserIcon";
import { UserType } from "../../../../types";
import Button from "../../../../ui/Button";
import { parseISOString } from "../../../../utils/helpers";

import styles from "./CommentItem.module.scss";

type Props = {
  author: UserType;
  text: string;
  createdAt: string;
};

const CommentItem: FC<Props> = ({ author, text, createdAt }): JSX.Element => {
  return (
    <div className={styles.commentItem}>
      <div>
        <UserIcon name={author.firstName} />
      </div>
      <div>
        <div className={styles.commentItem__author_container}>
          <span className={styles.commentItem__author}>
            {author.firstName} {author.lastName}
          </span>
          <span className={styles.commentItem__date}>
            {parseISOString(createdAt)}
          </span>
        </div>
      </div>
      <div className={styles.commentItem__text}>{text}</div>
      <div className={styles.commentItem__buttons_container}>
        <Button icon={faHeart} variant="text" title="0" />
        &#183; <Button variant="text" title="Reply" /> &#183;{" "}
        <Button variant="text" title="Edit" /> &#183;{" "}
        <Button variant="text" title="Delete" />
      </div>
    </div>
  );
};

export default CommentItem;
