import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FeedIcon from "@mui/icons-material/Feed";
import { CardActions, Grid } from "@mui/material";

const FormList = ({ forms }) => {
  return (
    <Grid container direction={"row"}>
      {Object.values(forms).map((form) => (
        <Card
          key={form.id}
          variant="outlined"
          style={{ margin: "10px", minWidth: 245 }}
        >
          <CardContent>
            <FeedIcon style={{minWidth: '200px', width: '70px',
    height: '70px'}} />
          </CardContent>
          <CardActions style={{justifyContent:'center', borderTop:'2px solid gray'}}>
            <Typography variant="h6" component="div">
              {form.name}
            </Typography>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};

export default FormList;
