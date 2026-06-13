import React from "react";
interface TextAreaProps {
  name: string;
  className: string;
  value?: string;
  onChange: any;
  placeholder: string;
  isRequired?: boolean;
  defaultValue?: any;
}
const TextArea = ({
  name,
  className,
  value,
  onChange,
  placeholder,
  isRequired,
  defaultValue,
}: TextAreaProps) => {
  return (
    <>
      <textarea
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
        defaultValue={defaultValue}
      ></textarea>
    </>
  );
};

export default TextArea;
