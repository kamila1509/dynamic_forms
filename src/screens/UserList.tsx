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
      <Datagrid rowClick="edit">
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
