// FormView.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { componentMap, formatObject } from "../utils/global";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { saveResponseForm, getFormById } from "../utils/api";
import background from '../assets/background.jpg'
export const DisplayFormikState = (props) => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);
const FormView = () => {
  const { userId, formId } = useParams();
  const [formFields, setFormFields] = useState([]);
  const [form, setForm] = useState({});
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    // Simulando la llamada a la base de datos
    const fetchData = async () => {
      try {
        // Aquí realiza la llamada a tu base de datos y obtén la estructura del formulario
        const response = await getFormById(userId, formId);
        const formData = response;
        setFormFields(formData.form);
        console.log("FORMVIEWWWWW", formFields);
        setInitialValues(formatObject(formData.form));
        console.log(formatObject(formFields));
        setForm(formData);
      } catch (error) {
        console.error("Error al obtener los datos del formulario", error);
      }
    };

    fetchData();
  }, []);

  const renderFormField = (field, index, handleChange, values) => {
    const { type, props } = field;
    const SelectedComponent = componentMap[type] || null;
    delete props.type;

    return (
      <div key={props.key} style={{ position: "relative", padding: "10px" }}>
        {SelectedComponent && (
          <SelectedComponent
            {...props}
            id={Object.keys(initialValues)[index]}
            name={Object.keys(initialValues)[index]}
            style={{marginBottom: 20, backgroundColor: '#fefcf9'}}
            onChange={(event) => {
              handleChange(event);
            }}
            value={values[index]}
          />
        )}
        {/* Otros elementos y lógica específica del campo de formulario */}
      </div>
    );
  };

  return (
    <Container style={{}}>
      <img style={{zIndex: -1, position:'absolute', left:0, width:'100vw', height:'100vh'}} src={background}></img>
      {Object.keys(initialValues).length && form && formFields && (
        <Box sx={{ flexGrow: 1, height: "100%", paddingTop: "20px" }}>
          <Grid item xs={2}>
            <Typography variant="h2" style={{textTransform: 'capitalize', paddingBottom: 20}}>{form.name}</Typography>
          </Grid>
          <Formik
            initialValues={{ ...initialValues }}
            onSubmit={async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              let createdDate = new Date().toLocaleString()
              alert(JSON.stringify({...values, createdDate}, null, 2));
              await saveResponseForm(userId, formId, {response: {...values, createdDate}})
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <Grid item xs={10}>
                    <Stack direction="column" flexWrap="wrap" flexGrow={1}>
                      {formFields.map((item, index) => {
                        return renderFormField(
                          item,
                          index,
                          handleChange,
                          values
                        );
                      })}
                    </Stack>
                  </Grid>

                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? (
                      <CircularProgress size={25} thickness={2} />
                    ) : (
                      <span>Enviar</span>
                    )}
                  </Button>

                  {/* <DisplayFormikState {...props} /> */}
                </form>
              );
            }}
          </Formik>
        </Box>
      )}
    </Container>
  );
};

export default FormView;
