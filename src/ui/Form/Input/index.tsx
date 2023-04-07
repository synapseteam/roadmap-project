import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

type InputProps = {
  name?: string;
  label?: string;
  ref: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...otherProps },
  ref
) => {
  return (
    <div className={styles.input__container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input className={styles.input} {...otherProps} name={name} ref={ref} />
    </div>
  );
};

const FormInput = React.forwardRef(Input);

export default FormInput;
