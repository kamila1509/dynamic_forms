import * as React from "react";
import { useState } from "react";
import useFormStore from "../store/formStore";
import { Authenticated, useRecordContext, useRedirect } from "react-admin";
import { saveFormData, updateFormData } from "../utils/database";
import BasicGrid from "../components/BasicGrid";
import useUserStore from "../store/userStore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function LayoutEdit({ ...props }) {
  const updateElement = useFormStore((state) => state.updateSelectedForm);
  const form = useFormStore.getState().selectedForm;
  const userId = useUserStore.getState().user.uid;
  const [formUpdated, setFormUpdated] = useState(form);
  const [showLink, setshowLink] = useState("");
  const addElement = useFormStore((state) => state.addElementToSelectedForm);
  const MySwal = withReactContent(Swal);
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
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: <p>Your work has been saved</p>,
      showConfirmButton: false,
      timer: 1500,
      width:'25em',
      customClass: {
        title: 'sweetAlert-text',
        icon: 'sweetAlert-icon'
      }
    })
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
