import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AccordionExpandIcon from '../components/Accordion';
import DraggableComponent from '../components/DraggableComponent';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const DroppableArea = ({ onDrop, draggedComponents, onDelete }) => {
  const [isClicked, setIsClicked] = useState(Array(draggedComponents.length).fill(false));
  const [isDraggable, setIsDraggable] = useState(Array(draggedComponents.length).fill(true));

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ['TEXT_FIELD', 'SELECT', 'DATE_FIELD', 'RADIO_FIELD', 'NUMBER_FIELD', 'TEXT_AREA_FIELD'],
    drop: (item, monitor) => {
      const index = monitor.getItem().index;
      onDrop(item);
      setIsDraggable((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  const handleContainerClick = (index) => {
    setIsClicked((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div ref={drop} style={{ height: '100%', padding: '20px', border: isActive ? '2px dashed #aaa' : '2px solid #aaa' }}>
      {draggedComponents.map((componentObject, index) => {
        const { Component, props } = componentObject;
        const isClickedElement = isClicked[index];
        const isDraggableElement = isDraggable[index];

        return (
          <div
            key={index}
            onClick={() => handleContainerClick(index)}
            style={{
              position: 'relative',
              padding: '10px',
              border: isClickedElement ? '2px dashed #5f5be4' : 'none',
              cursor: isDraggableElement ? 'move' : 'default',
            }}
          >
            <Component {...props} isDraggable={isDraggableElement} />
            {isClickedElement && (
              <div style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}>
                <DeleteIcon onClick={() => onDelete(index)} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function BasicGrid() {
  const [draggedComponents, setDraggedComponents] = useState([]);

  const handleDeleteElement = (index) => {
    const updatedComponents = [...draggedComponents];
    updatedComponents.splice(index, 1);
    setDraggedComponents(updatedComponents);
  };

  const handleDrop = (item) => {
    const newComponent = { Component: DraggableComponent, props: { key: draggedComponents.length, ...item } };
    setDraggedComponents([...draggedComponents, newComponent]);
  };

  return (
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
  );
}
