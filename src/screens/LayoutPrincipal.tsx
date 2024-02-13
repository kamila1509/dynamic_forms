import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AccordionExpandIcon from '../components/Accordion';
import { TextField } from 'react-admin';
import DraggableComponent from '../components/DraggableComponent';
import { useState } from 'react';

const DraggableItem = ({ text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Typography>{text}</Typography>
      <TextField label={text} fullWidth />
    </div>
  );
};

const DroppableArea = ({ onDrop , draggedComponents }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'TEXT_FIELD',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div ref={drop} style={{ height: '100%', border: isActive ? '2px dashed #aaa' : 'none' }}>
      {draggedComponents.map((component, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          {component}
        </div>
      ))}

    </div>
  );
};

export default function BasicGrid() {
    const [draggedComponents, setDraggedComponents] = useState([]);

    const handleDrop = (item) => {
        console.log(item)
      const newComponent = (
        <DraggableComponent
          key={draggedComponents.length}
          label={item.label}
          defaultValue={item.defaultValue}
          type={item.type}
        />
      );
      setDraggedComponents([...draggedComponents, newComponent]);
    };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, height: '100%', paddingTop: '20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <AccordionExpandIcon></AccordionExpandIcon>
          </Grid>
          <Grid item xs={10}>
            <DroppableArea onDrop={handleDrop} draggedComponents={draggedComponents} />
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
}
