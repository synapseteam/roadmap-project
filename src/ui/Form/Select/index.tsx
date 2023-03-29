import React, { ChangeEvent, FC, useState } from "react";
import PT from "prop-types";

import styles from "./Select.module.scss";

const propTypes = {
  options: PT.arrayOf(
    PT.shape({
      value: PT.string.isRequired,
      label: PT.string.isRequired,
    }).isRequired
  ).isRequired,
  value: PT.string,
  onChange: PT.func,
};

type Props = PT.InferProps<typeof propTypes>;

const Select: FC<Props> = ({ options, value, onChange }): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    value ?? ""
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(newValue);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className={styles.select}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={styles.option}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = propTypes;

export default Select;
