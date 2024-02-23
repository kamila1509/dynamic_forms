import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AccordionExpandIcon from '../components/Accordion';
import DraggableComponent from '../components/DraggableComponent';
import { useState } from 'react';
import DroppableArea from '../components/DroppableArea';
import useFormStore from '../store/formStore';
import { Authenticated } from 'react-admin';

export default function BasicGrid() {
  const [draggedComponents, setDraggedComponents] = useState([]);
  const formStructure = useFormStore.getState().formStructure

  const handleDeleteElement = (index) => {
    const updatedComponents = [...draggedComponents];
    updatedComponents.splice(index, 1);
    setDraggedComponents(updatedComponents);
    console.log('handleDeleteEELEM', formStructure.splice(index,1))
    const updateElements = formStructure.splice(index,1)
    useFormStore.setState({formStructure: updateElements})
  };

  const handleDrop = (item) => {
    console.log('handleDrop',item)
    useFormStore.setState({formStructure: [...formStructure, { type: item.type, props: { key: formStructure.length, ...item } }]})
    const newComponent = { Component: DraggableComponent, props: { key: draggedComponents.length, ...item } };
    setDraggedComponents([...draggedComponents, newComponent]);
  };

  return (
    <Authenticated>
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, height: '100%', paddingTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <AccordionExpandIcon></AccordionExpandIcon>
          </Grid>
          <Grid className='dropArea' item xs={10} sx={{ minHeight: '900px' }}>
            <DroppableArea onDrop={handleDrop} draggedComponents={draggedComponents} onDelete={handleDeleteElement} />
          </Grid>
        </Grid>
      </Box>
    </DndProvider>
    </Authenticated>
  );
}
