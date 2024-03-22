import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin";
import { useParams } from "react-router-dom";

export const UserDetail = () => {
  const { id } = useParams();
  return (
    <Edit resource="users" title={'Users'}>
      <SimpleForm>
        <TextInput source="displayName" />

        <SelectInput
          source="role"
          choices={[
            { id: "manager", name: "Manager" },
            { id: "admin", name: "Administrador" },
          ]}
        />
        <TextInput source="email" />
      </SimpleForm>
    </Edit>
  );
};
