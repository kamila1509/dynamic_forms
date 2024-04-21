import * as React from "react";
import { useState } from "react";
import useFormStore from "../store/formStore";
import { Authenticated } from "react-admin";
import { saveFormData } from "../utils/database";
import BasicGrid from "../components/BasicGrid";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function LayoutPrincipal({...props}) {
  const formStructure = useFormStore.getState().formStructure;
  const [formUpdated, setFormUpdated] = useState(formStructure)
  const updateElement = useFormStore((state) => state.updateElement);
  const addElement = useFormStore((state) => state.addElement);
  const MySwal = withReactContent(Swal);
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
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: <p>Your form has been saved</p>,
      showConfirmButton: false,
      timer: 1500,
      width:'25em',
      customClass: {
        title: 'sweetAlert-text',
        icon: 'sweetAlert-icon'
      }
    })
    setTimeout(() => {
      window.location.href = '/admin/Templates'
    },1600)
  }
  const handleSaveChanges = (index: any, additionalParam: any) => {
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