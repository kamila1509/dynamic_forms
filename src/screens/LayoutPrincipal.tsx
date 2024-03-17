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
import { Authenticated, useRecordContext } from "react-admin";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { saveFormData } from "../utils/database";
import BasicGrid from "../components/BasicGrid";

export default function LayoutPrincipal({...props}) {
  const formStructure = useFormStore.getState().formStructure;
  const [formUpdated, setFormUpdated] = useState(formStructure)
  const updateElement = useFormStore((state) => state.updateElement);
  const addElement = useFormStore((state) => state.addElement);
  React.useEffect(() => {
    // Suscribirse a los cambios en formStructure
    const unsubscribe = useFormStore.subscribe(
      (newFormStructure) => {
        // Manejar el cambio en formStructure
        setFormUpdated(newFormStructure.formStructure)
        console.log("formStructure ha cambiado:", newFormStructure);
      },
      (state) => state.formStructure
    );

    // Devolver la función de limpieza para desuscribirse cuando el componente se desmonta
    return unsubscribe;
  }, []);

  const updateElementSelectedForm = (elements: any) => {
    useFormStore.setState({ formStructure: [ ...elements] });
  }
  const handleSaveData = (name: any) => {
    saveFormData(formStructure, name)
  }
  const handleSaveChanges = (index: any, additionalParam: any) => {
    console.log(index)
    console.log(additionalParam)
    updateElement(index, { ...additionalParam });

  }

  return (
    <Authenticated>
       <BasicGrid
        formStructure={formUpdated}
        selectedForm={null}
        addElement={addElement}
        updateElementsStructure={updateElementSelectedForm}
        saveData={handleSaveData}
        onSaveChanges={handleSaveChanges}
      />
    </Authenticated>
  );
}