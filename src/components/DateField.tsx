import React from 'react';
import TextField from '@mui/material/TextField';
import { useDrag } from 'react-dnd';

const DateFieldInput = ({ label, defaultValue, ...props }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'DATE_FIELD',
        item: { label, defaultValue , type:'DATE_FIELD'},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      });
  return (

    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      <TextField
      type="date"
      label={label}
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      defaultValue={defaultValue}
      {...props}
    />
    </div>
    
  );
};

export default DateFieldInput;
