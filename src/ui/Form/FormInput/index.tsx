import React from "react";
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import classnames from "classnames";

import Input from "../Input";

import styles from "./FormInput.module.scss";

type Props<T extends FieldValues> = {
  label?: string;
  placeholder?: string;
  error?: FieldError;
  disabled?: boolean;
  variant?: string;
} & UseControllerProps<T>;

const FormInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  variant = "input",
  error,
  control,
  disabled = false,
}: Props<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={undefined}
      render={({ field: { onChange, value } }) => (
        <div className={styles.textField}>
          <label htmlFor={name} className={styles.input__label}>
            {label}
          </label>
          {variant === "input" ? (
            <>
              <Input
                value={value}
                className={styles.input}
                placeholder={placeholder}
                type="text"
                disabled={disabled}
                onChange={(text) => {
                  onChange(text);
                }}
              />
              {/* <input */}
              {/*  value={value} */}
              {/*  className={styles.input} */}
              {/*  placeholder={placeholder} */}
              {/*  type="text" */}
              {/*  disabled={disabled} */}
              {/*  onChange={(text) => { */}
              {/*    onChange(text); */}
              {/*  }} */}
              {/* /> */}
              {error && (
                <span className={styles.input__error}>{error?.message}</span>
              )}
            </>
          ) : (
            <textarea
              placeholder={placeholder}
              className={classnames(styles.input, styles.input__textarea)}
              disabled={disabled}
              onChange={(text) => {
                onChange(text);
              }}
            />
          )}
        </div>
      )}
    />
  );
};

// FormInput.propTypes = propTypes;

export default FormInput;
