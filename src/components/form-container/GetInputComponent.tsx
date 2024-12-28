import {
  BooleanParameter,
  CheckBoxParameter,
  // BooleanParameter,
  // DateParameter,
  // PhoneNumberParameter,
  // SelectParameter,
  // DateTimeParameter,
  // ImageParameterWithPanelActions,
  // LookupInput,
  InputPassword,
  MeddleRange,
  SelectParameter,
  TextParameter,
} from "./index";
export function GetInputComponent(type) {
  switch (type) {
    case "text":
    case "float":
    case "numeric":
      return TextParameter;
    case "select":
      return SelectParameter;
    case "checkbox":
      return CheckBoxParameter;
    // case "datetime":
    //   return DateParameter;
    // case "date":
    //   return DateParameter;
    case "boolean":
      return BooleanParameter;
    // case "phoneNumber":
    //   return PhoneNumberParameter;
    case "minMax":
      return MeddleRange;
    // case "lookup":
    //   return LookupInput;

    case "password":
      return InputPassword;

    default:
      return TextParameter;
  }
}
