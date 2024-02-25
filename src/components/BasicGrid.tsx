import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AccordionExpandIcon from "../components/Accordion";
import DraggableComponent from "../components/DraggableComponent";
import DroppableArea from "../components/DroppableArea";
import { Authenticated } from "react-admin";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { saveFormData } from "../utils/database";

const BasicGrid = ({ formStructure, selectedForm, addElement, updateElementsStructure, saveData, onSaveChanges }) => {
  const [draggedComponents, setDraggedComponents] = useState([]);
  const [nameForm, setNameForm] = useState(selectedForm?.name);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (selectedForm && selectedForm.form) {
      setDraggedComponents([]);
      setNameForm(selectedForm.name)
      selectedForm.form.forEach((element) => {
        handleDrop2(element);
        const newComponent = {
          Component: DraggableComponent,
          props: { key: element.props.key, ...element.props },
        };
        setDraggedComponents((prev) => [...prev, newComponent]);
      });
    }
  }, [selectedForm?.form]);

  const handleDeleteElement = (index) => {
    const updatedComponents = [...draggedComponents];
    updatedComponents.splice(index, 1);
    setDraggedComponents(updatedComponents);

    const updateElements = formStructure.splice(index, 1);
    updateElementsStructure(updateElements);
  };

  const handleDrop = (item) => {
    const newItem = {
      type: item.type,
      props: { key: formStructure.length, ...item },
    };
    addElement(newItem);

    const newComponent = {
      Component: DraggableComponent,
      props: { key: draggedComponents.length, ...item },
    };
    setDraggedComponents([...draggedComponents, newComponent]);
  };

  const handleDrop2 = (item) => {
    const isDuplicate = formStructure.some(
      (existingItem) => existingItem.props.key === item.props.key
    );

    if (!isDuplicate) {
      addElement({ type: item.type, props: item.props });
    }
  };

  const saveForm = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveModal = () => {
    console.log("Nombre del formulario:", nameForm);
    if(saveData) {
      saveData(nameForm)
    } else {
      saveFormData(formStructure, nameForm);
    }

    setOpenModal(false);
    setNameForm("");
  };

  return (
    <Authenticated>
      <DndProvider backend={HTML5Backend}>
        <Box sx={{ flexGrow: 1, height: "100%" }}>
          <Grid container padding={1} justifyContent={"flex-end"}>
            {formStructure.length > 0 && (
              <Button autoFocus onClick={saveForm}>
                Save Changes
              </Button>
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <AccordionExpandIcon></AccordionExpandIcon>
            </Grid>
            <Grid className="dropArea" item xs={10} sx={{ minHeight: "900px" }}>
              <DroppableArea
              onSaveChanges={onSaveChanges}
                formStructure= {formStructure}
                onDrop={handleDrop}
                draggedComponents={draggedComponents}
                onDelete={handleDeleteElement}
              />
            </Grid>
          </Grid>
        </Box>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Guardar Formulario</DialogTitle>
          <DialogContent>
            <TextField
              label="Nombre del Formulario"
              value={nameForm}
              onChange={(e) => setNameForm(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleSaveModal}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </DndProvider>
    </Authenticated>
  );
};

export default BasicGrid;
