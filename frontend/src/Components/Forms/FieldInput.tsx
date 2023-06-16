import React, { ChangeEventHandler } from "react";

interface Props {
  type?: any,
  id?: string,
  name?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  value?: any,
  defaultValue?: any,
  onChange?: ChangeEventHandler
}

const FieldInput = ({ type, id, name, placeholder, required, disabled, value, defaultValue, onChange }: Props) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-main focus:border-primary-main block w-full p-2.5 dark:bg-dark-surface dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-main dark:focus:border-primary-main" />
  )
}

export default FieldInput;