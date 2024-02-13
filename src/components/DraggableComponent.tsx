import React from 'react';
import { useDrag } from 'react-dnd';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextFieldInput from './TextField';
import SelecrFieldInput from './Select';

const DraggableComponent = ({ label, defaultValue, type, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { label, defaultValue, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const componentMap = {
    'TEXT_FIELD': TextFieldInput,
    'SELECT': SelecrFieldInput
    // Agrega más tipos y componentes según sea necesario
  };

  const SelectedComponent = componentMap[type] || null;

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', marginBottom: 10 }}>
      {SelectedComponent && <SelectedComponent {...props} label={label} defaultValue={defaultValue} />}
    </div>
  );
};

export default DraggableComponent;
