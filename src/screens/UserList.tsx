import {
  List,
  Datagrid,
  TextField,
  EmailField,
  SelectField,
} from "react-admin";

export const UserList = () => {
  return (
    <List resource="users">
      <Datagrid
        sx={{
          "& .RaDatagrid-checkbox": {
            display: "none",
          },
          "& .MuiTableCell-paddingCheckbox.RaDatagrid-headerCell": {
            opacity: 0,
          },
        }}
        isRowSelectable={(record) => record.email}
        rowClick="edit"
      >
        <EmailField source="email" />
        <TextField source="displayName" />
        <SelectField
          source="role"
          choices={[
            { id: "manager", name: "Manager" },
            { id: "admin", name: "Administrador" },
          ]}
          optionValue="id"
        />
      </Datagrid>
    </List>
  );
};
