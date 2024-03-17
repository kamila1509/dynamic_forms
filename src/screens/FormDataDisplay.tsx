// FormDataDisplay.js

import { Typography } from '@mui/material';
import React from 'react';
import { useRecordContext } from 'react-admin';

const FormDataDisplay = () => {
  const record = useRecordContext();
  const formData = record?.form || [];

  return (
    <div>
      <Typography variant="h6">Formulario</Typography>
      <ul>
        {formData.map((field, index) => (
          <li key={index}>
            <strong>{field.props.label}:</strong> {field.props.defaultValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormDataDisplay;
