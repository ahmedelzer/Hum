import {
  BooleanParameter,
  CheckBoxParameter,
  DateParameter,
  // BooleanParameter,
  // DateParameter,
  // PhoneNumberParameter,
  // SelectParameter,
  // DateTimeParameter,
  // ImageParameterWithPanelActions,
  // LookupInput,
  InputPassword,
  MeddleRangeParameter,
  RadioParameter,
  SelectParameter,
  TextParameter,
} from "./index";
export function GetInputComponent(type) {
  console.log(type);

  switch (type) {
    case "text":
    case "float":
    case "numeric":
      return TextParameter;
    case "select":
      return SelectParameter;
    case "checkbox":
      return CheckBoxParameter;
    case "datetime":
    case "date":
    case "birthday":
    case "pushTime":
      return DateParameter;
    case "boolean":
      return BooleanParameter;
    case "radio":
      return RadioParameter;
    case "minMax":
      return MeddleRangeParameter;
    case "password":
      return InputPassword;

    default:
      return TextParameter;
  }
}
