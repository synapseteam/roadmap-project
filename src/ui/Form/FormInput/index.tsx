import React, {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import PT from "prop-types";

const propTypes = {
  label: PT.string.isRequired,
  name: PT.string.isRequired,
  type: PT.string,
  value: PT.string,
  onChange: PT.func,
};

type Props = PT.InferProps<typeof propTypes>;

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, name, type, value, onChange },
  ref
): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(name, event.target.value);
    }
  };
  return (
    <div>
      {label && <label htmlFor={name || ""}>{label}</label>}
      <input
        type={type || "text"}
        name={name || ""}
        value={value || ""}
        ref={ref}
        onChange={handleChange}
      />
    </div>
  );
};

const FormInput = forwardRef(Input);

FormInput.propTypes = propTypes;

export default FormInput;
