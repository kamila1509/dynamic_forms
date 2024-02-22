import * as React from 'react';
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useFormStore from '../store/formStore';
import CustomizedDialogs from './Dialog';

const DroppableArea = ({ onDrop, draggedComponents, onDelete }) => {
  const [editStates, setEditStates] = useState(Array(draggedComponents.length).fill(false));
  const [isClicked, setIsClicked] = useState(Array(draggedComponents.length).fill(false));
  const [isDraggable, setIsDraggable] = useState(Array(draggedComponents.length).fill(true));
  const formStructure = useFormStore.getState().formStructure;
  console.log('formStructure', formStructure);

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

  const onEdit = (index) => {
    setEditStates((prev) => {
      const newEditStates = [...prev];
      newEditStates[index] = true;
      return newEditStates;
    });
  };
  const handleSaveChanges = (index) => {
    console.log(index)
    console.log('AQUIIII',formStructure[index])
  };

  const handleEditDialogClose = () => {
    setEditStates(Array(draggedComponents.length).fill(false));
  };

  return (
    <div ref={drop} style={{ height: '100%', padding: '20px', border: isActive ? '2px dashed #aaa' : '2px solid #aaa' }}>
      {draggedComponents.map((componentObject, index) => {
        const { Component, props } = componentObject;
        const isClickedElement = isClicked[index];
        const isDraggableElement = isDraggable[index];
        const editState = editStates[index];

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
            {isClickedElement && (
              <div style={{ position: 'absolute', top: 0, left: 0, cursor: 'pointer' }}>
                <EditIcon onClick={() => onEdit(index)} />
              </div>
            )}
            {editState && <CustomizedDialogs open={editState} onClose={handleEditDialogClose} index={index}  />}
          </div>
        );
      })}
    </div>
  );
};

export default DroppableArea;
