import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AccordionExpandIcon from '../components/Accordion';
import DraggableComponent from '../components/DraggableComponent';
import { useState } from 'react';

const DroppableArea = ({ onDrop , draggedComponents }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ['TEXT_FIELD', 'SELECT','DATE_FIELD','RADIO_FIELD','NUMBER_FIELD','TEXT_AREA_FIELD'],
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div ref={drop} style={{ height: '100%', padding: '20px', border: isActive ? '2px dashed #aaa' : '2px solid #aaa' }}>
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
        {...item}
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
          <Grid className='dropArea' item xs={10} sx={{minHeight:'900px'}} >
            <DroppableArea onDrop={handleDrop} draggedComponents={draggedComponents} />
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
  );
}
