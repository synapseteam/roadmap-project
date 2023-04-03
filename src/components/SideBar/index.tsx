import React, { FC, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppDispatch } from "../../app/hooks";
import { addCard } from "../../app/slices/cardsListSlice";
import { SideBarFormType } from "../../types";
import Button from "../../ui/Button";
import FormInput from "../../ui/Form/FormInput";

import styles from "./SideBar.module.scss";

const schema = yup.object().shape({
  title: yup.string().min(3).max(100).required(),
  description: yup.string(),
});

type Props = {
  title?: string;
  isForm: boolean;
  children?: ReactNode;
};

const SideBar: FC<Props> = ({ title, isForm, children }): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SideBarFormType>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: SideBarFormType) => {
    dispatch(addCard(data));
    reset(
      { title: "", description: "" },
      {
        keepValues: false,
      }
    );
  };

  return (
    <div className={styles.sidebar__container}>
      {title && <h2 className={styles.sidebar__title}>{title}</h2>}
      {isForm ? (
        <form
          onSubmit={handleSubmit(submitForm)}
          className={styles.sidebar__form}
        >
          <FormInput
            label="Title"
            name="title"
            placeholder="Try to keep your title short"
            error={errors.title}
            control={control}
          />
          <FormInput
            label="Description (optional)"
            name="description"
            variant="textarea"
            placeholder="Add any additional details"
            error={errors.description}
            control={control}
          />
          <div className={styles.sidebar__button}>
            <Button variant="filled" size="default" title="Add post" submit />
          </div>
        </form>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default SideBar;
