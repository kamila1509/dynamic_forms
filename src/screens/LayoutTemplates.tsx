import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import { getFormsForUser } from "../utils/database";
import useUserStore from "../store/userStore";
import FormList from "../components/FormList";

const LayoutTemplates = () => {
  const [forms, setForms] = React.useState({});
  const [showLoading, setShowLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const userId = useUserStore.getState().user.uid;

  React.useEffect(() => {
    setShowLoading(true);
    setError(null);
    getFormsForUser()
      .then((forms) => {
        setForms(forms);
        setShowLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        setShowLoading(false);
      });
  }, [userId]);

  if (showLoading) {
    return (
       <Box justifyContent={'center'} alignItems={'center'} sx={{ display: 'flex', width: '100%', height:'100%' }}>
      <CircularProgress />
    </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          Error loading forms: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, height: "100%", paddingTop: "20px" }}>
      <Grid container spacing={2}>
        <Stack direction="column" flexWrap="wrap" flexGrow={1}>
          {Object.keys(forms).length > 0 ? (
            <FormList forms={forms} />
          ) : (
            <Typography variant="h6">No forms available.</Typography>
          )}
        </Stack>
      </Grid>
    </Box>
  );
};

export default LayoutTemplates;
