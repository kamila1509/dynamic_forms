import DateFieldInput from "../components/formFields/DateField";
import NumberFieldInput from "../components/formFields/NumberField";
import RadioFieldInput from "../components/formFields/RadioField";
import SelecrFieldInput from "../components/formFields/Select";
import TextAreaField from "../components/formFields/TextArea";
import TextFieldInput from "../components/formFields/TextField";

 export const componentMap = {
    'TEXT_FIELD': TextFieldInput,
    'SELECT': SelecrFieldInput,
    'DATE_FIELD': DateFieldInput,
    'RADIO_FIELD': RadioFieldInput,
    'NUMBER_FIELD': NumberFieldInput,
    'TEXT_AREA_FIELD': TextAreaField
  };