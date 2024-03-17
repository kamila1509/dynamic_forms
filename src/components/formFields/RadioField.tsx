import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { applyValidation } from '../../utils/validations';
import { FormHelperText } from '@mui/material';

const RadioFieldInputDraggable = ({ label, options, defaultValue , onChange,  ...props}) => {
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
      <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup 

        defaultValue={defaultValue} 
       >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            name={props.name}
            onChange={handleInputChange}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};
const RadioFieldInput = (props) => <RadioFieldInputDraggable {...props}/>

export default RadioFieldInput;
