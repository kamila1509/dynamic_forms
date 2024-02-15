import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useDrag } from 'react-dnd';

const RadioFieldInputDraggable = ({ label, options, defaultValue  }) => {
  return (
      <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup defaultValue={defaultValue}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
const RadioFieldInput = (props) => <RadioFieldInputDraggable {...props}/>

export default RadioFieldInput;
