import React from "react";
import TextField from "@mui/material/TextField";
import { useDrag } from "react-dnd";

const TextAreaField = ({ label, defaultValue, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TEXT_AREA_FIELD",
    item: { label, defaultValue, type: "TEXT_AREA_FIELD" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
      <TextField
        multiline
        rows={4} // Ajusta la cantidad de filas según tus necesidades
        label={label}
        variant="outlined"
        fullWidth
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
};

export default TextAreaField;
