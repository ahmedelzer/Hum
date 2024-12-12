import BaseInput from "./BaseInput";
import DatepickerComponent from "./DatepickerComponent";

class DateParameter extends BaseInput {
  render() {
    const { fieldName, value, Enable, placeholder } = this.props;
    // this.props.onChange({
    //   value: new Date(value ? value : Date.now()),
    //   name: fieldName,
    // });
    return (
      <DatepickerComponent
        name={fieldName}
        defaultValue={value}
        placeholderText={placeholder}
        // setInfo={setInfo}
        {...this.props}
        enable={Enable}
      />
    );
  }
}

export default DateParameter;

// import { DateBox } from "devextreme-react";

// const DateParameter = ({ value, Enable }) => (
//   <DateBox
//     value={new Date(value ? value : Date.now())}
//     readOnly={!Enable}
//     type="date"
//   />
// );
// export default DateParameter;
