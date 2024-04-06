import * as React from "react";
import { useState } from "react";
import useFormStore from "../store/formStore";
import { Authenticated, useRecordContext, useRedirect } from "react-admin";
import { saveFormData, updateFormData } from "../utils/database";
import BasicGrid from "../components/BasicGrid";
import useUserStore from "../store/userStore";

export default function LayoutEdit({ ...props }) {
  const updateElement = useFormStore((state) => state.updateSelectedForm);
  const form = useFormStore.getState().selectedForm;
  const userId = useUserStore.getState().user.uid;
  const [formUpdated, setFormUpdated] = useState(form);
  const [showLink, setshowLink] = useState("");
  const addElement = useFormStore((state) => state.addElementToSelectedForm);
  console.log("FORM", form);
  React.useEffect(() => {
    // Suscribirse a los cambios en formStructure
    const unsubscribe = useFormStore.subscribe(
      (newFormStructure) => {
        // Manejar el cambio en formStructure
        setFormUpdated(newFormStructure.selectedForm);
        console.log("selectedForm ha cambiado:", newFormStructure);
      },
      (state) => state.formStructure
    );
    setshowLink(`${window.location.origin}/form/${userId}/${form.id}`);
    // Devolver la función de limpieza para desuscribirse cuando el componente se desmonta
    return unsubscribe;
  }, []);

  const updateElementSelectedForm = (elements: any) => {
    useFormStore.setState({ selectedForm: { ...form, form: elements } });
  };
  const handleSaveData = (name: any) => {
    const updated = useFormStore.getState().selectedForm.form;
    updateFormData(updated, name, form.id);
  };
  const handleSaveChanges = (index: any, additionalParam: any) => {
    updateElement(index, { ...additionalParam });
  };
  return (
    <Authenticated>
      <BasicGrid
        showLink={showLink}
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
