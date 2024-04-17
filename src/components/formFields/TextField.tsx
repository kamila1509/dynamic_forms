import React, { useState, ChangeEvent } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { applyValidation } from '../../utils/validations';

interface Props extends TextFieldProps {
  label: string;
  defaultValue?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldInput: React.FC<Props> = ({ label, defaultValue, onChange, ...props }) => {
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const validationError = applyValidation(inputValue, props);
    setError(validationError);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextField
      autoComplete='on'
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

