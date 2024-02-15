import React from 'react';
import TextField from '@mui/material/TextField';

const TextFieldInput = ({ label, defaultValue, ...props }) => {
  return (
      <TextField label={label} variant="outlined" fullWidth defaultValue={defaultValue} {...props} />
  );
};


export default TextFieldInput;
