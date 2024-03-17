import {
    List,
    Datagrid,
    TextField,
    EmailField,
    SelectField,
  } from "react-admin";
import useUserStore from "../store/userStore";
  
  export const ResponseList = () => {
    const userId = useUserStore.getState().user.uid;
    return (
      <List  resource={`responses`} >
        <Datagrid rowClick="show">
          <TextField source="name" />
          <TextField source="id" />
        </Datagrid>
      </List>
    );
  };
  