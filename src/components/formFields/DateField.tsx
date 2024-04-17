import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { applyValidation } from '../../utils/validations';

const DateFieldInput = ({ label, defaultValue, onChange, ...props }) => {
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
      autoComplete='on'
      type="date"
      label={label}
      variant="outlined"
      fullWidth
      onChange={handleInputChange}
      error={error !== null}
      InputLabelProps={{
        shrink: true,
      }}
      defaultValue={defaultValue}
      {...props}
    />
    
  );
};

export default DateFieldInput;
