import React, { FC, MouseEventHandler, ReactNode, useState } from "react";
import classnames from "classnames";

import Button from "../../Button";

import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type SelectProps = {
  options: Option[];
  component?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  component,
  placeholder,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.select__container}>
      <div
        className={styles.select__selectedOption}
        onClick={toggleOpen}
        role="presentation"
      >
        {component && component}
        {!component && (
          <div className={styles.select__selectedOption_text}>
            {selectedOption?.label ? selectedOption?.label : placeholder}
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles.select__option_container}>
          {options.map((option) => {
            if (option.onClick) {
              return (
                <Button
                  key={option.label}
                  variant="outlined"
                  onClick={option.onClick}
                  title={option.label}
                  className={styles.select__option_button}
                />
              );
            }
            return (
              <div
                key={option.label}
                role="presentation"
                className={classnames(styles.select__option, {
                  [styles.select__option_selected]: option.value === value,
                })}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
