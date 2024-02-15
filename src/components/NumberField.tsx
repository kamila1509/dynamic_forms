import React from "react";
import TextField from "@mui/material/TextField";
import { useDrag } from "react-dnd";

const NumberFieldInput = ({ label, defaultValue, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "NUMBER_FIELD",
    item: { label, defaultValue, type: "NUMBER_FIELD" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}>
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
    </div>
  );
};

export default NumberFieldInput;
