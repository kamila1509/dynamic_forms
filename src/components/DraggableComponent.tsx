import { useState } from 'react';
import { useDrag } from 'react-dnd';
import TextFieldInput from './TextField';
import SelecrFieldInput from './Select';
import DateFieldInput from './DateField';
import RadioFieldInput from './RadioField';
import NumberFieldInput from './NumberField';
import TextAreaField from './TextArea';
import DeleteIcon from '@mui/icons-material/Delete';

const DraggableComponent = ({ label, defaultValue, type, ...props }) => {
    console.log(props)
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
    'TEXT_AREA_FIELD': TextAreaField
    // Agrega más tipos y componentes según sea necesario
  };

  const SelectedComponent = componentMap[type] || null;
  const handleContainerClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div style={{ position: 'relative',padding: '10px',border: isClicked ? '2px solid red' : 'none' }}>
    {SelectedComponent && <SelectedComponent {...props} label={label} defaultValue={defaultValue} ref={drag} />}
  </div>
  );
};

export default DraggableComponent;
