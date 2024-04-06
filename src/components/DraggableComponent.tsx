import { useState } from 'react';
import { useDrag } from 'react-dnd';
import TextFieldInput from './formFields/TextField';
import SelecrFieldInput from './formFields/Select';
import DateFieldInput from './formFields/DateField';
import RadioFieldInput from './formFields/RadioField';
import NumberFieldInput from './formFields/NumberField';
import TextAreaField from './formFields/TextArea';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxField from './formFields/CheckBox';

const DraggableComponent = ({ label, defaultValue, type, ...props }) => {
    const [isClicked, setIsClicked] = useState(false);
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
    'TEXT_AREA_FIELD': TextAreaField,
    'CHECKBOX_FIELD': CheckBoxField
  };

  const SelectedComponent = componentMap[type] || null;
  return (
    <div style={{ position: 'relative',padding: '10px'}}>
    {SelectedComponent && <SelectedComponent {...props} label={label} defaultValue={defaultValue} ref={drag} />}
  </div>
  );
};

export default DraggableComponent;
