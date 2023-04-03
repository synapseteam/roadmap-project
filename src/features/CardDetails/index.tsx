import React, { FC, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";

import SideBar from "../../components/SideBar";
import Status from "../../components/Status";
import UserIcon from "../../components/UserIcon";
import data from "../../mock/cardDetailsData.json";
import Button from "../../ui/Button";
import Input from "../../ui/Form/Input";
import { parseISOString } from "../../utils/helpers";

import CommentItem from "./components/CommentItem";

import styles from "./CardDetails.module.scss";

const CardDetails: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSubmitComment = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const newDate = dayjs().toDate().toISOString();
      const newComment = {
        text: inputValue,
        createdAt: newDate,
        author: {
          firstName: "Nick",
          lastName: "Cave",
        },
      };
      console.log(newComment);
      setInputValue("");
    }
  };

  return (
    <div className={styles.cardDetails}>
      <Button
        variant="text"
        size="default"
        icon={faArrowLeft}
        iconSize={18}
        className={styles.cardDetails__buttonBack}
        title="Back"
        onClick={() => navigate(-1)}
      />
      <div className={styles.cardDetails__sideBar}>
        <SideBar isForm={false}>
          <span>Voters</span>
          <div className={styles.cardDetails__sideBar_voters}>
            {data.voters.map((voter) => (
              <UserIcon
                key={voter.lastName}
                name={voter.firstName}
                className={styles.cardDetails__sideBar_voterItem}
              />
            ))}
          </div>
        </SideBar>
      </div>
      <div className={styles.cardDetails__content}>
        <div className={styles.cardDetails__content_header}>
          <Button
            variant="outlined"
            size="default"
            className={styles.cardDetails__content_headerButton}
          >
            <FontAwesomeIcon icon={faChevronUp} />
            {data.votes}
          </Button>
          <div className={styles.cardDetails__heading_container}>
            <h1 className={styles.cardDetails__heading}>{data.title}</h1>
            <Status status={data.status} isOutlined />
          </div>
        </div>
        <div className={styles.cardDetails__content_authorContainer}>
          <UserIcon name={data.author.firstName} />
          <span className={styles.cardDetails__content_author}>
            {data.author.firstName} {data.author.lastName}
          </span>
          <span className={styles.cardDetails__content_date}>
            {parseISOString(data.createdAt)}
          </span>
        </div>
        <div className={styles.cardDetails__content_description}>
          {data.description}
        </div>
        <div className={styles.cardDetails__comments_container}>
          <span className={styles.cardDetails__comments_title}>Comments</span>
          <div className={styles.cardDetails__comments_inputContainer}>
            <Input
              name="comment"
              value={inputValue}
              placeholder="Add a comment ..."
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSubmitComment}
            />
          </div>
          <div className={styles.cardDetails__comments}>
            {data.comments.map((comment) => (
              <CommentItem
                key={comment.createdAt}
                author={comment.author}
                text={comment.text}
                createdAt={comment.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
