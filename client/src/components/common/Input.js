import React from 'react';
import TextField from 'material-ui/TextField';

const Input = ({
  input,
  label,
  type,
  placeholder,
  className,
  defaultValue,
  meta: { touched, error }
}) => {
  // {/* <TextInput {...input} s={6} type={type} id={input.name} />
  // {touched && error && <div className="red-text">{error}</div>} */}
  return (
    <TextField
      {...input}
      type={type}
      id={input.name}
      hintText={placeholder}
      errorText={error}
      fullWidth={true}
      floatingLabelText={label}
      defaultValue={defaultValue}
    />
  );
};

export { Input };
