import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AccordionExpandIcon from "../components/Accordion";
import DraggableComponent from "../components/DraggableComponent";
import { useState } from "react";
import DroppableArea from "../components/DroppableArea";
import useFormStore from "../store/formStore";
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

export default function BasicGrid() {
  const [draggedComponents, setDraggedComponents] = useState([]);
  const formStructure = useFormStore.getState().formStructure;
  const [nameForm, setNameForm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteElement = (index) => {
    const updatedComponents = [...draggedComponents];
    updatedComponents.splice(index, 1);
    setDraggedComponents(updatedComponents);
    console.log("handleDeleteEELEM", formStructure.splice(index, 1));
    const updateElements = formStructure.splice(index, 1);
    useFormStore.setState({ formStructure: updateElements });
  };

  const handleDrop = (item) => {
    console.log("handleDrop", item);
    useFormStore.setState({
      formStructure: [
        ...formStructure,
        { type: item.type, props: { key: formStructure.length, ...item } },
      ],
    });
    const newComponent = {
      Component: DraggableComponent,
      props: { key: draggedComponents.length, ...item },
    };
    setDraggedComponents([...draggedComponents, newComponent]);
  };

  const saveForm = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveModal = () => {
    // Aquí puedes realizar la lógica para guardar el formulario con el nombre proporcionado
    console.log("Nombre del formulario:", nameForm);
    saveFormData(formStructure, nameForm);

    // Cerrar el modal y limpiar el nombre del formulario
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
}
