import React from "react";
interface InputFieldProps {
  type: string;
  name: string;
  className: string;
  value?: any;
  onChange: any;
  isReadOnly?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  defaultValue?: any;
  onKeyPress?: any;
}
const InputField = ({
  type,
  name,
  className,
  value,
  onChange,
  isReadOnly,
  placeholder,
  isRequired,
  defaultValue,
  onKeyPress,
}: InputFieldProps) => {
  return (
    <>
      <input
        type={type}
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
        placeholder={placeholder}
        required={isRequired}
        onKeyPress={onKeyPress}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default InputField;
