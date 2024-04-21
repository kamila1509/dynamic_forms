import React, { useEffect, useState } from 'react';
import { useRecordContext, Button, downloadCSV } from 'react-admin';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';
import jsonExport from 'jsonexport/dist';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ResponsesTable = () => {
  const record = useRecordContext();
  const responsesData = record?.responses || [];
  const formData = record?.form || [];
  const [responses, setResponses] = useState([]);
  const [sorting, setSorting] = useState({ field: null, order: 'asc' });

  useEffect(() => {
    if(responsesData) {
        console.log('setResponses(responsesData);',responsesData)
        setResponses(responsesData);
    }
  }, [record]);

  const handleSort = (field) => {
    if (sorting.field === field) {
      setSorting({ ...sorting, order: sorting.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSorting({ field, order: 'asc' });
    }
  };

  const sortedResponses = responses.length >0 ? [...responses].sort((a, b) => {
    if (sorting.field) {
      if (a[sorting.field] < b[sorting.field]) {
        return sorting.order === 'asc' ? -1 : 1;
      }
      if (a[sorting.field] > b[sorting.field]) {
        return sorting.order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  }) : []
  function reorderArrayOfObjects(array) {
    return array.map(obj => {
        const { id, createdDate, ...rest } = obj;
        return { ...rest, id, createdDate };
    });
}

  const exporter = () => {

    jsonExport(reorderArrayOfObjects(sortedResponses), (err, csv) => {
    try {
      downloadCSV(csv, `Formulario ${record.name}`);
    } catch (error) {
       console.error(err)
    }
    });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom:'10px', borderBottom:'3px solid rgba(224, 224, 224, 1)' }}>
        <Typography variant="h6">Respuestas</Typography>
        <Button onClick={exporter}>
          <FileDownloadIcon style={{ marginRight: 5 }} />
          Export
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {formData.map((field, index) => (
              <TableCell key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleSort(field.props.formValue)}>
                  <Typography>{field.props.label}</Typography>
                  {sorting.field === field.props.formValue ? (
                    sorting.order === 'asc' ? <ArrowUpwardIcon sx={{fontSize: 20}}/> : <ArrowDownwardIcon sx={{fontSize: 20}} />
                  ): (
                    <ArrowUpwardIcon sx={{fontSize: 20}} />
                  )}
                </Box>
              </TableCell>
            ))}
            <TableCell>Fecha Recibida</TableCell>
          </TableRow>
        </TableHead>
        {( responses && sortedResponses.length > 0 )? (
          <TableBody>
            {sortedResponses.map((response, index) => (
              <TableRow key={index}>
                {formData.map((field, index) => (
                  <TableCell>{response[field.props.formValue]}</TableCell>
                ))}
                 <TableCell>{response.createdDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <Typography variant="h6">No tiene Respuestas</Typography>
        )}
      </Table>
    </div>
  );
};

export default ResponsesTable;
