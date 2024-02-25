import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import useFormStore from "../store/formStore";
import { validationMap } from "../utils/global"; // Asegúrate de importar el mapa de validaciones
import { Grid } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// ...

// ...

const CustomizedDialogs = ({ formStructure, onSaveChanges ,open, onClose, index }) => {
  //const formStructure = useFormStore.getState().formStructure;
  const formStore = useFormStore();
  const [validationType, setValidationType] = React.useState("");
  const [additionalParam, setAdditionalParam] = React.useState({
    required: false,
    letters: false,
    numbers: false,
    email: false,
    noSpacesAtEdges: false,
    minLength: "",
    maxLength: "",
    regex: "",
    label: "",
    options: [],
  });

  const [newOption, setNewOption] = React.useState({
    label: "",
    value: "",
  });

  const componentType = formStructure[index]?.type || "";
  React.useEffect(() => {
    console.log(formStructure)
    setAdditionalParam(formStructure[index]?.props);
  }, []);

  const handleValidationTypeChange = (event) => {
    setValidationType(event.target.value);
  };

  const handleAdditionalParamChange = (event, key) => {
    setAdditionalParam((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
    console.log(additionalParam);
  };

  const handleCheckboxChange = (key) => {
    setAdditionalParam((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleOptionChange = (event, optionIndex, key) => {
    setAdditionalParam((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        [key]: event.target.value,
      };
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  const handleAddOption = () => {
    setAdditionalParam((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
    setNewOption({
      label: "",
      value: "",
    });
  };

  const handleRemoveOption = (optionIndex) => {
    setAdditionalParam((prev) => {
      const updatedOptions = [...prev.options];
      delete updatedOptions[optionIndex];
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  const handleSaveChangesInternal = () => {
    console.log("Índice:", index);
    console.log("Tipo de validación:", validationType);
    console.log("Valor adicional:", additionalParam);
    onSaveChanges(index, { ...additionalParam })
    // Realiza acciones con el tipo de validación y el valor adicional
    // ...
    // Cierra el diálogo
    onClose();
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Configuración
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} style={{ flexDirection: "column" }}>
          <Grid item>
            <Typography gutterBottom>Edita el nombre de tu Label</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Label"
              variant="outlined"
              fullWidth
              value={additionalParam.label}
              onChange={(e) => handleAdditionalParamChange(e, "label")}
            />
          </Grid>
          {(componentType === "SELECT" || componentType === "RADIO_FIELD") && (
            <Grid
              container
              style={{ flexDirection: "column", padding: "20px", gap: 10 }}
            >
              <Grid item>
                <Typography gutterBottom>Opciones:</Typography>
              </Grid>
              <Grid container spacing={1} item>
                <Grid item>
                  <TextField
                    label="Label"
                    variant="outlined"
                    value={newOption.label}
                    onChange={(e) =>
                      setNewOption({ ...newOption, label: e.target.value })
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Value"
                    variant="outlined"
                    value={newOption.value}
                    onChange={(e) =>
                      setNewOption({ ...newOption, value: e.target.value })
                    }
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleAddOption()}
                    style={{ marginTop: "10px" }}
                  >
                    +
                  </Button>
                </Grid>
              </Grid>
              {additionalParam.options &&
                additionalParam.options.map((option, optionIndex) => (
                  <Grid key={optionIndex} container spacing={1}>
                    <Grid item>
                      {" "}
                      <TextField
                        label="Label"
                        variant="outlined"
                        fullWidth
                        value={option.label}
                        onChange={(e) =>
                          handleOptionChange(e, optionIndex, "label")
                        }
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Value"
                        variant="outlined"
                        fullWidth
                        value={option.value}
                        onChange={(e) =>
                          handleOptionChange(e, optionIndex, "value")
                        }
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => handleRemoveOption(optionIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          )}
        </Grid>
        <Typography gutterBottom>
          Selecciona el tipo de validación para el componente:
        </Typography>
        {validationMap[componentType]?.map((validationOption) => {
          switch (validationOption) {
            case "required":
            case "letters":
            case "numbers":
            case "email":
            case "noSpacesAtEdges":
              return (
                <FormControlLabel
                  key={validationOption}
                  control={
                    <Checkbox
                      checked={additionalParam[validationOption]}
                      onChange={() => handleCheckboxChange(validationOption)}
                    />
                  }
                  label={
                    validationOption.charAt(0).toUpperCase() +
                    validationOption.slice(1)
                  }
                />
              );
            case "length":
              return (
                <Grid container spacing={2} style={{ flexDirection: "column" }}>
                  <Grid item>
                    <Typography gutterBottom>Longitud</Typography>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        key="minLength"
                        label="Min"
                        variant="outlined"
                        fullWidth
                        value={additionalParam.minLength}
                        onChange={(e) =>
                          handleAdditionalParamChange(e, "minLength")
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        key="maxLength"
                        label="Max"
                        variant="outlined"
                        fullWidth
                        value={additionalParam.maxLength}
                        onChange={(e) =>
                          handleAdditionalParamChange(e, "maxLength")
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              );
            case "regex":
              return (
                <TextField
                  key={validationOption}
                  label={
                    validationOption.charAt(0).toUpperCase() +
                    validationOption.slice(1)
                  }
                  variant="outlined"
                  fullWidth
                  value={additionalParam.regex}
                  onChange={(e) => handleAdditionalParamChange(e, "regex")}
                />
              );
            // Agrega más casos según sea necesario
            default:
              return null;
          }
        })}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSaveChangesInternal}>
          Guardar cambios
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CustomizedDialogs;
