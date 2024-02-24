import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import { componentMap } from "../utils/global";

const LayoutTemplates = (...props) => {
    const {formStructure} = props

  return (
    <Box sx={{ flexGrow: 1, height: "100%", paddingTop: "20px" }}>
      <Grid container spacing={2}>
        <Stack direction="column" flexWrap="wrap" flexGrow={1}>
          {formStructure.length > 0 ? (
            formStructure.map((item, index) => {
              const SelectedComponent = componentMap[item.type] || null;
              delete item.props.type
              return (
                <div
                  key={index}
                  style={{ position: "relative", padding: "10px" }}
                >
                  {SelectedComponent && <SelectedComponent {...item.props} />}
                </div>
              );
            })
          ) : (
            <Box sx={{ minWidth: 275, padding: 2 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    No tienes Fomrulario
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Stack>
      </Grid>
    </Box>
  );
};

export default LayoutTemplates;
