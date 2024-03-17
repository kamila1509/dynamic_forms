import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { applyValidation } from '../../utils/validations';

const TextFieldInput = ({ label, defaultValue, onChange, ...props }) => {
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const validationError = applyValidation(inputValue, props);
    setError(validationError);

    if (event) {
      onChange(event);
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      defaultValue={defaultValue}
      onChange={handleInputChange}
      error={error !== null}
      helperText={error}
      {...props}
    />
  );
};

export default TextFieldInput;
