import React, { useEffect, useState } from 'react';
import { useRecordContext ,LoadingIndicator, Button, downloadCSV } from 'react-admin';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';
import jsonExport from 'jsonexport/dist';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ResponsesTable = () => {
  const record = useRecordContext();
  const responsesData = record?.responses || [];
  const formData = record?.form || [];
const [responses, setResponses] = useState([]);

  useEffect(() => {
    setResponses(responsesData)
  },[record])

  const exporter = () => {
    jsonExport(responses, (err, csv) => {
        downloadCSV(csv, 'Responses'); // download as 'posts.csv` file
    });
};


  return (
    <div>
      <Box sx={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
      <Typography variant="h6">Respuestas</Typography>
      <Button onClick={exporter}>
        <FileDownloadIcon style={{marginRight: 5}}/>
         Export</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {formData.map((field, index) => (
              <TableCell key={index}>{field.props.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {responses.length > 0 && (
        <TableBody>
          {responses.map((response, index) => (
            <TableRow key={index}>
               {formData.map((field, index) => {
                    return (
                        <TableCell>{response[field.props.formValue]}</TableCell>
                    )
                })}
            </TableRow>
          ))}
        </TableBody>)}
      </Table>
    </div>
  );
};

export default ResponsesTable;
