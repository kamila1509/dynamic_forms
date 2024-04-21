import Attachment from "../components/formFields/AttachmentField";
import CheckBoxField from "../components/formFields/CheckBox";
import DateFieldInput from "../components/formFields/DateField";
import NumberFieldInput from "../components/formFields/NumberField";
import RadioFieldInput from "../components/formFields/RadioField";
import SelecrFieldInput from "../components/formFields/Select";
import TextAreaField from "../components/formFields/TextArea";
import TextFieldInput from "../components/formFields/TextField";

export const componentMap = {
  TEXT_FIELD: TextFieldInput,
  SELECT: SelecrFieldInput,
  DATE_FIELD: DateFieldInput,
  RADIO_FIELD: RadioFieldInput,
  NUMBER_FIELD: NumberFieldInput,
  TEXT_AREA_FIELD: TextAreaField,
  ATTACHMENT_FIELD: Attachment,
  CHECKBOX_FIELD: CheckBoxField
};

export const validationMap = {
  TEXT_FIELD: ["required", "length", "letters", "email", "regex"],
  SELECT: ["required"],
  DATE_FIELD: ["required", "regex"], // Ejemplo de validación de formato de fecha (YYYY-MM-DD)
  RADIO_FIELD: ["required"],
  NUMBER_FIELD: ["required", "numbers"],
  TEXT_AREA_FIELD: ["required", "length"],
  CHECKBOX_FIELD: ["required"]
};

export function formatObject(inputArray: []) {
  const result = {};

  inputArray.forEach(item => {
      const label = item.props.formValue;
      result[label] =  '';
  });

  return result;
}