import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDrag } from 'react-dnd';
import TextFieldInput from './formFields/TextField';
import SelecrFieldInput from './formFields/Select';
import DateFieldInput from './formFields/DateField';
import RadioFieldInput from './formFields/RadioField';
import NumberFieldInput from './formFields/NumberField';
import TextAreaField from './formFields/TextArea';
import CheckBoxField from './formFields/CheckBox';

const DraggableAccordionItem = ({ type, label, defaultValue, options}) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { type, label, defaultValue, options },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 , padding: '10px'}}>
      {renderAccordionItem(type, label, defaultValue, options)}
    </div>
  );
};

const renderAccordionItem = (type, label, defaultValue, options) => {
  switch (type) {
    case 'TEXT_FIELD':
      return <TextFieldInput label={label} defaultValue={defaultValue} />;
    case 'SELECT':
      return <SelecrFieldInput label={label} defaultValue={defaultValue} options={options} />;
    case 'DATE_FIELD':
      return <DateFieldInput label={label} defaultValue={defaultValue} />;
    case 'RADIO_FIELD':
      return <RadioFieldInput label={label} defaultValue={defaultValue} options={options} />;
    case 'NUMBER_FIELD':
      return <NumberFieldInput label={label} defaultValue={defaultValue} />;
    case 'TEXT_AREA_FIELD':
      return <TextAreaField label={label} defaultValue={defaultValue} />;
    case 'CHECKBOX_FIELD':
      return <CheckBoxField label={label} defaultValue={defaultValue} options={options} />;
    default:
      return null;
  }
};

const DraggableAccordion = ({ title, children }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="panel1-content" id="panel1-header">
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default function AccordionExpandIcon() {
  return (
    <div>
      <DraggableAccordion title="Elements">
        <DraggableAccordionItem type="TEXT_FIELD" label="TextField" defaultValue="" />
        <DraggableAccordionItem type="SELECT" label="Select" defaultValue={1} options={[{ label: 'label1', value: '1' }]} />
        <DraggableAccordionItem type="DATE_FIELD" label="Date" defaultValue="" />
        <DraggableAccordionItem type="RADIO_FIELD" label="Radio" defaultValue="" options={[{ label: 'label1', value: '1' }]} />
        <DraggableAccordionItem type="NUMBER_FIELD" label="Number" defaultValue="" />
        <DraggableAccordionItem type="TEXT_AREA_FIELD" label="TextArea" defaultValue="" />
        <DraggableAccordionItem type="CHECKBOX_FIELD" defaultValue="" options={[{ label: 'CheckBox', value: '1' }]} />
      </DraggableAccordion>
    </div>
  );
}
