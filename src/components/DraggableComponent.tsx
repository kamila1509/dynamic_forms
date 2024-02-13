import React from 'react';
import { useDrag } from 'react-dnd';
import TextField from '@mui/material/TextField';

const DraggableComponent = ({ label, defaultValue, type }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { label, defaultValue, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', marginBottom: 10 }}>
      <TextField label={label} variant="outlined" fullWidth defaultValue={defaultValue} />
    </div>
  );
};

export default DraggableComponent;
