import React from 'react';
import { useDrag } from 'react-dnd';
import TextFieldInput from './TextField';
import SelecrFieldInput from './Select';
import DateFieldInput from './DateField';
import RadioFieldInput from './RadioField';
import NumberFieldInput from './NumberField';
import TextAreaField from './TextArea';

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
    'SELECT': SelecrFieldInput,
    'DATE_FIELD': DateFieldInput,
    'RADIO_FIELD': RadioFieldInput,
    'NUMBER_FIELD': NumberFieldInput,
    'TEXT_AREA_FIELD': TextAreaField
    // Agrega más tipos y componentes según sea necesario
  };

  const SelectedComponent = componentMap[type] || null;

  return (
    <div>
        {SelectedComponent && <SelectedComponent {...props} label={label} defaultValue={defaultValue} />}
    </div>
  );
};

export default DraggableComponent;
