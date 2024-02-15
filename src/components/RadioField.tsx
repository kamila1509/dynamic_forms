import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useDrag } from 'react-dnd';

const RadioFieldInputDraggable = ({ label, options, defaultValue  }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'RADIO_FIELD',
        item: { label, options ,defaultValue , type:'RADIO_FIELD'},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      });
  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
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
    </div>
    
  );
};
const RadioFieldInput = (props) => <RadioFieldInputDraggable {...props}/>

export default RadioFieldInput;
