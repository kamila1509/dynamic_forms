import {
  List,
  Datagrid,
  TextField,
  EmailField,
  SelectField,
  Authenticated,
} from "react-admin";
import useUserStore from "../store/userStore";

export const ResponseList = () => {
  const userId = useUserStore.getState().user.uid;
  return (
    <Authenticated>
    <List resource={`responses`}>
      <Datagrid
        sx={{
          "& .RaDatagrid-checkbox": {
            display: "none",
          },
          "& .MuiTableCell-paddingCheckbox.RaDatagrid-headerCell": {
            opacity: 0,
          },
        }}
        rowClick="show"
      >
        <TextField source="name" />
        <TextField source="id" />
      </Datagrid>
    </List>
    </Authenticated>
  );
};
