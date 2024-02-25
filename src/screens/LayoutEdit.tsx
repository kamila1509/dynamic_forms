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
import { saveFormData, updateFormData } from "../utils/database";
import BasicGrid from "../components/BasicGrid";

export default function LayoutEdit({...props}) {
  const updateElement = useFormStore((state) => state.updateSelectedForm);
  const form = useFormStore.getState().selectedForm;
  const [formUpdated, setFormUpdated] = useState(form)
  const addElement = useFormStore((state) => state.addElementToSelectedForm);
  const clearFormStructure = useFormStore((state) => state.clearFormStructure)
  console.log('FORM',form)
  React.useEffect(() => {
    // Suscribirse a los cambios en formStructure
    const unsubscribe = useFormStore.subscribe(
      (newFormStructure) => {
        // Manejar el cambio en formStructure
        setFormUpdated(newFormStructure.selectedForm)
        console.log("selectedForm ha cambiado:", newFormStructure);
      },
      (state) => state.formStructure
    );

    // Limpiar formStructure al montar el componente
    clearFormStructure();

    // Devolver la función de limpieza para desuscribirse cuando el componente se desmonta
    return unsubscribe;
  }, [clearFormStructure]);
  
  const updateElementSelectedForm = (elements: any) => {
    useFormStore.setState({ selectedForm: { ...form, form: elements} });
  }
  const handleSaveData = (name: any) => {
    const updated = useFormStore.getState().selectedForm.form;
    updateFormData(updated, name, form.id)
    
  }
  const handleSaveChanges = (index: any, additionalParam: any) => {
    updateElement(index, { ...additionalParam });
  }
  return (
    <Authenticated>
       <BasicGrid
        formStructure={formUpdated.form}
        selectedForm={formUpdated}
        addElement={addElement}
        updateElementsStructure={updateElementSelectedForm}
        saveData={handleSaveData}
        onSaveChanges={handleSaveChanges}
      />
    </Authenticated>
  );
}