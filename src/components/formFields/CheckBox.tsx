import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { applyValidation } from '../../utils/validations';
import { FormHelperText } from '@mui/material';

const CheckBoxInputDraggable = ({ label, options, defaultValue, onChange, ...props }) => {
  const [error, setError] = useState(null);
  const [checkedValues, setCheckedValues] = useState(defaultValue || []);

  const handleInputChange = (event) => {
    const { value, checked } = event.target;
    let updatedValues = [...checkedValues];

    if (checked) {
      updatedValues.push(value);
    } else {
      updatedValues = updatedValues.filter((val) => val !== value);
    }

    const validationError = applyValidation(updatedValues, props);
    setError(validationError);

    setCheckedValues(updatedValues);

    if (onChange) {
      onChange(updatedValues);
    }
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkedValues.includes(option.value)}
                onChange={handleInputChange}
                value={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

const CheckBoxField = (props) => <CheckBoxInputDraggable {...props} />;

export default CheckBoxField;
