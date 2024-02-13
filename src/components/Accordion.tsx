import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDrag } from 'react-dnd';
import TextFieldInput from './TextField';
import SelecrFieldInput from './Select';

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
      </DraggableAccordion>
    </div>
  );
}
