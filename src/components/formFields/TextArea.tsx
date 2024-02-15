import React from "react";
import TextField from "@mui/material/TextField";

const TextAreaField = ({ label, defaultValue, ...props }) => {

  return (
      <TextField
        multiline
        rows={4} // Ajusta la cantidad de filas según tus necesidades
        label={label}
        variant="outlined"
        fullWidth
        defaultValue={defaultValue}
        {...props}
      />
  );
};

export default TextAreaField;
