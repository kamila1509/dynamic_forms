import React from 'react';
import { useDrag } from 'react-dnd';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const DraggableSelect = ({ label, options, defaultValue }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SELECT',
    item: { label, options, defaultValue, type: 'SELECT' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', marginBottom: 10 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>{label}</InputLabel>
        <Select defaultValue={defaultValue} label={label}>
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};


const SelecrFieldInput = (props) => <DraggableSelect {...props} />;
export default SelecrFieldInput;
