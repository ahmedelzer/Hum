import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  RadioGroup,
  Radio,
  RadioLabel,
  RadioIcon,
  RadioIndicator,
  Input,
  InputField,
  CircleIcon,
} from "../../../../components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller, useFormContext } from "react-hook-form";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDeviceInfo } from "../../../utils/component/useDeviceInfo";
import useFetch from "../../../../components/hooks/APIsFunctions/useFetch";
import { defaultProjectProxyRoute } from "../../../../request";
import { buildApiUrl } from "../../../../components/hooks/APIsFunctions/BuildApiUrl";
import useFetchWithoutBaseUrl from "../../../../components/hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import ContactSchema from "../../../Schemas/ForgetSchema/ContactSchema.json";
import ForgetSchemaActions from "../../../Schemas/ForgetSchema/ForgetSchemaActions.json";
const RadioListParameter = ({
  value: row, // Expect index (0, 1, etc.)
  fieldName,
  enable,
  control,
  schemaID,
  lookupID,
  schema = ContactSchema,
  schemaActions = ForgetSchemaActions,
  lookupDisplayField,
  lookupReturnField,
  setValue,
  ...props
}) => {
  //   const { data, error, isLoading } = useFetch(
  //     `/Dashboard/GetDahboardFormSchemaBySchemaID?DashboardFormSchemaID=${lookupID}`,
  //     defaultProjectProxyRoute
  //   );

  const columns = schema.dashboardFormSchemaParameters.filter(
    (param) => !param.isIDField
  );
  const getAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType == "Get"
    );
  const dataSourceAPI = (query) => {
    return buildApiUrl(query, {
      ...control._formValues,
      projectRout: schema.projectProxyRoute,
    });
  };

  const { data, error, isLoading } = useFetchWithoutBaseUrl(
    dataSourceAPI(getAction)
  );
  const [selectedValue, setSelectedValue] = useState(null);
  useEffect(() => {
    if (data?.dataSource?.length > 0 && !selectedValue && setValue) {
      const defaultVal = data.dataSource[0][lookupReturnField];
      setSelectedValue(defaultVal);
      props.onChange(defaultVal);
      setValue(fieldName, defaultVal); // ✅ Initialize react-hook-form value
    }
  }, [data, isLoading]);

  const { os } = useDeviceInfo();
  return (
    <View>
      <Controller
        control={control}
        name={fieldName}
        // defaultValue={selectedValue}
        rules={{ required: false }}
        render={({
          field: { onChange: formOnChange, value = selectedValue, onBlur },
        }) => (
          <View>
            <RadioGroup
              value={value}
              onChange={(newValue) => {
                setSelectedValue(newValue);
                formOnChange(newValue); // Save the selected value to form
              }}
              isDisabled={!enable}
              style={{ paddingHorizontal: 16, paddingVertical: 8 }}
            >
              {data?.dataSource?.map((rowItem) => (
                <Radio
                  key={rowItem[schema.idField]}
                  value={rowItem[lookupReturnField]}
                >
                  <RadioIndicator>
                    <RadioIcon
                      as={
                        os === "web"
                          ? () => (
                              <MaterialIcons
                                name="radio-button-checked"
                                size={20}
                                color="black"
                              />
                            )
                          : CircleIcon
                      }
                    />
                  </RadioIndicator>

                  {/* {columns.map((item) => (
                    <RadioLabel>{rowItem[item.fieldName]}</RadioLabel>
                  ))} */}
                  <RadioLabel>{rowItem[lookupDisplayField]}</RadioLabel>
                </Radio>
              ))}
            </RadioGroup>
          </View>
        )}
      />
    </View>
  );
};

export default RadioListParameter;
