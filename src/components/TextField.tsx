import React from 'react';
import { useDrag } from 'react-dnd';
import TextField from '@mui/material/TextField';

const DraggableTextField = ({ label, defaultValue }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TEXT_FIELD',
    item: { label, defaultValue , type:'TEXT_FIELD'},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      <TextField label={label} variant="outlined" fullWidth defaultValue={defaultValue} />
    </div>
  );
};

const TextFieldInput = (props) => <DraggableTextField {...props} />;

export default TextFieldInput;
