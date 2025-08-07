import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import ResponsiveContainer from "../../kitchensink-components/auth/layout/ResponsiveContainer";
import FaovertCardIcon from "../cards/FaovertCardIcon";
import MenuCardDeities from "../cards/MenuCardDeities";
import GoBackHeader from "../header/GoBackHeader";

const DetailsScreen = ({ route }) => {
  const localization = useSelector((state) => state.localization.localization);
  const item = route.params.item;
  const fieldsType = route.params.fieldsType;
  const schemaActions = route.params.schemaActions;

  return (
    <ResponsiveContainer setMargin={true} style={""}>
      <View className="flex-1 bg-body">
        {/* Header */}
        <GoBackHeader
          subTitle={localization.Hum_screens.menu.details.header.subTitle}
          title={localization.Hum_screens.menu.details.header.title}
          rightComponent={
            <FaovertCardIcon
              fieldsType={fieldsType}
              item={item}
              withAbsolutePos={false}
            />
          }
        />
        <MenuCardDeities
          item={item}
          fieldsType={fieldsType}
          schemaActions={schemaActions}
        />
      </View>
    </ResponsiveContainer>
  );
};

export default DetailsScreen;
