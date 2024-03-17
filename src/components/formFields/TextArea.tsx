import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { applyValidation } from "../../utils/validations";

const TextAreaField = ({ label, defaultValue, onChange, ...props }) => {
  const [error, setError] = useState(null);

  const handleTextareaChange = (event) => {
    const textareaValue = event.target.value;
    const validationError = applyValidation(textareaValue, props);
    setError(validationError);

    if (event) {
      onChange(event);
    }
  };

  return (
    <TextField
      multiline
      rows={4}
      label={label}
      variant="outlined"
      fullWidth
      defaultValue={defaultValue}
      onChange={handleTextareaChange}
      error={error !== null}
      helperText={error}
      {...props}
    />
  );
};

export default TextAreaField;
