import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FeedIcon from "@mui/icons-material/Feed";
import { CardActions, Grid } from "@mui/material";
import { EditButton, DeleteButton, useRefresh } from "react-admin"; // Importa useRefresh
import useUserStore from "../store/userStore";
import useFormStore from "../store/formStore";
import { dataProvider } from "../dataProvider";

const FormList = ({ forms, onDelete }) => {
  const userId = useUserStore.getState()?.user?.uid;
  const setSelectForm = useFormStore((state) => state.setSelectForm);
  const refresh = useRefresh(); // Usa useRefresh para actualizar el componente después de eliminar un elemento

  const handleSelectedForm = React.useCallback(
    (form) => {
      setSelectForm(form);
    },
    [setSelectForm]
  );

  const handleDeleteForm = async (formId) => {
    // Lógica para eliminar el formulario
    console.log(`Eliminar formulario con ID: ${formId}`);
    await dataProvider.delete(`forms/${userId}`, {
      id: formId
    });
    onDelete(true)
    // Aquí deberías realizar la lógica de eliminación de tu backend
    // Después de eliminar exitosamente, refresca el componente
    refresh();
  };

  return (
    <Grid container direction={"row"}>
      {Object.values(forms).map((form) => (
        <Card
          key={form.id}
          variant="outlined"
          style={{ margin: "10px", minWidth: 245 }}
        >
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            <DeleteButton
              style={{ justifyItems: "flex-start", maxWidth: 20 }}
              label=""
              onClick={()=> {
                handleDeleteForm(form.id)
              }} // Maneja el clic en el botón de eliminar
              record={form}
            />
            <FeedIcon
              style={{ minWidth: "200px", width: "70px", height: "70px" }}
            />
          </CardContent>
          <CardActions
            style={{ justifyContent: "center", borderTop: "2px solid gray" }}
          >
            <Typography style={{flex: 5, textAlign: 'center'}} variant="h6" component="div">
              {form.name}
            </Typography>
            <EditButton
              style={{flex: 1}}
              label=""
              onClick={() => {
                console.log(form);
                handleSelectedForm(form);
              }}
              record={form}
            />
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};

export default FormList;
