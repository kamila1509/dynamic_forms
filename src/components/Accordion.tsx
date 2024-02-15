import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDrag } from 'react-dnd';
import TextFieldInput from './TextField';
import SelecrFieldInput from './Select';
import DateFieldInput from './DateField';
import RadioFieldInput from './RadioField';
import NumberFieldInput from './NumberField';
import TextAreaField from './TextArea';

const DraggableAccordion = ({ title, children }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="panel1-content" id="panel1-header">
        <Typography>{title}</Typography>
      </AccordionSummary>
    <AccordionDetails style={{display:'flex', flexDirection:'column', gap:'10px'}}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default function AccordionExpandIcon() {
  return (
    <div>
      <DraggableAccordion title="Elements">
        <TextFieldInput label={'TextField'} defaultValue={''} ></TextFieldInput>
        <SelecrFieldInput label={'Select'} defaultValue={1} options={[{label: 'label1', value:'1'}]}></SelecrFieldInput>
        <DateFieldInput label={'Date'} defaultValue={''}></DateFieldInput>
        <RadioFieldInput label={'Radio'} defaultValue={''} options={[{label: 'label1', value:'1'}]}></RadioFieldInput>
        <NumberFieldInput label={'Number'} defaultValue={''}></NumberFieldInput>
        <TextAreaField label={'TextArea'} defaultValue={''}></TextAreaField>
      </DraggableAccordion>
    </div>
  );
}
