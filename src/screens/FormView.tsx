// FormView.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { componentMap } from "../utils/global";
import { getFormById } from "../utils/database";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

const FormView = () => {
  const { userId, formId } = useParams();
  const [formFields, setFormFields] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    // Simulando la llamada a la base de datos
    const fetchData = async () => {
      try {
        // Aquí realiza la llamada a tu base de datos y obtén la estructura del formulario
        const response = await getFormById(userId, formId);
        const formData = response;
        setFormFields(formData.form);
        setForm(formData)
      } catch (error) {
        console.error("Error al obtener los datos del formulario", error);
      }
    };

    fetchData();
  }, []);

  const renderFormField = (field) => {
    const { type, props } = field;
    const SelectedComponent = componentMap[type] || null;

    return (
      <div key={props.key} style={{ position: "relative", padding: "10px" }}>
        {SelectedComponent && <SelectedComponent {...props} />}
        {/* Otros elementos y lógica específica del campo de formulario */}
      </div>
    );
  };

  return (
    <Container>
        <Box sx={{ flexGrow: 1, height: "100%", paddingTop: "20px" }}>
        <Grid item xs={2}>
        <Typography variant="h2">{form?.name}</Typography>
        </Grid>
      <Grid item xs={10} spacing={2}>
        <Stack direction="column" flexWrap="wrap" flexGrow={1}>
          {formFields.map(renderFormField)}
        </Stack>
      </Grid>
    </Box>
    </Container>
  );
};

export default FormView;
