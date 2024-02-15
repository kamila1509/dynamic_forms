import React from 'react';
import TextField from '@mui/material/TextField';
import { useDrag } from 'react-dnd';

const DateFieldInput = ({ label, defaultValue, ...props }) => {
  return (

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
    
  );
};

export default DateFieldInput;
