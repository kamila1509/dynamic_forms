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

const DraggableTextField = ({ text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <TextField label={text} variant="outlined" fullWidth />
    </div>
  );
};

const DraggableAccordion = ({ title, children }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="panel1-content" id="panel1-header">
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default function AccordionExpandIcon() {
  return (
    <div>
      <DraggableAccordion title="Elements">
    <TextFieldInput label={'TextField'} defaultValue={''} type={'TEXT_FIELD'}></TextFieldInput>
      </DraggableAccordion>
      <DraggableAccordion title="Accordion 2">
        <DraggableTextField text="Texto 2" />
      </DraggableAccordion>
    </div>
  );
}
