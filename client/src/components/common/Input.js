import React from 'react';
import TextField from 'material-ui/TextField';

const Input = ({
  input,
  label,
  type,
  placeholder,
  className,
  defaultValue,
  required,
  meta: { touched, error }
}) => {
  const errorMessage = touched && error ? error : '';
  return (
    <TextField
      {...input}
      type={type}
      id={input.name}
      required={required}
      hintText={placeholder}
      errorText={errorMessage}
      fullWidth={true}
      floatingLabelText={label}
      floatingLabelFixed={true}
      defaultValue={defaultValue}
      autoComplete="off"
    />
  );
};

export { Input };
