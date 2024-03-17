import {
  Datagrid,
  Show,
  SimpleShowLayout,
  TextField,
  useGetOne,
} from "react-admin";
import { useParams } from "react-router-dom";
import FormDataDisplay from "./FormDataDisplay";
import ResponsesTable from "./ResponseTable";

export const ResponseShow = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useGetOne("responses", { id });

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Show resource="responses" id={id}>
      <SimpleShowLayout>
        <TextField source="name" />
        <FormDataDisplay />
        <ResponsesTable />
      </SimpleShowLayout>
    </Show>
  );
};
