import React from "react";
import BaseInput from "./BaseInput";
import { LanguageContext } from "../../../context/Language";
import { booleanParameterStyle as styles } from "./styles";

class BooleanParameter extends BaseInput {
  handleChange = (e) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e.value);
    }
  };

  render() {
    const { localization } = this.context;
    const { values, value, fieldName, Enable, onKeyPress } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.radioGroup}>
          <input
            id={fieldName}
            type="radio"
            value={1}
            Enable={Enable}
            name={fieldName}
            required
            // disabled={!Enable} // Add disable functionality
          />
          <label htmlFor={fieldName} className={styles.radioLabel}>
            {values[1]}
          </label>
          <input
            required
            id={`${fieldName}-no`}
            type="radio"
            value={0}
            name={fieldName}
          />
          <label htmlFor={`${fieldName}-no`} className={styles.radioLabel}>
            {values[0]}
          </label>
        </div>
      </div>
    );
  }
}
BooleanParameter.contextType = LanguageContext;

export default BooleanParameter;

// import { RadioGroup } from "devextreme-react";

// const BooleanParameter = ({ value, onChange, Enable, onKeyPress }) => (
//   <RadioGroup
//     items={[
//       { text: "Yes", value: true },
//       { text: "No", value: false },
//     ]}
//     value={value}
//     onValueChanged={onChange}
//     onKeyPress={onKeyPress}
//     readOnly={!Enable}
//   />
// );
// export default BooleanParameter;
