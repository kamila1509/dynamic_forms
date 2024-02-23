import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { applyValidation } from '../../utils/validations';

const DraggableSelect = ({ label, options, defaultValue, onChange, ...props }) => {
  const [error, setError] = useState(null);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const validationError = applyValidation(selectedValue, props);
    setError(validationError);

    if (onChange) {
      onChange(selectedValue, validationError);
    }
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        defaultValue={defaultValue}
        label={label}
        onChange={handleSelectChange}
        error={error !== null}
        {...props}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SelecrFieldInput = (props) => <DraggableSelect {...props} />;
export default SelecrFieldInput;
