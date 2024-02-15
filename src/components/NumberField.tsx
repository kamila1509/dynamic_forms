import React from "react";
import TextField from "@mui/material/TextField";

const NumberFieldInput = ({ label, defaultValue, ...props }) => {
  return (
      <TextField
        type="number"
        label={label}
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={defaultValue}
        {...props}
      />
  );
};

export default NumberFieldInput;
