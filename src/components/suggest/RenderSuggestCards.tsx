import { default as React } from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import { theme } from "../../Theme";
import SuggestCard from "../cards/SuggestCard";
// import { LocalizationContext } from "../../../context/LocalizationContext";
import { useCart } from "../../../context/CartProvider";
import SuggestCardSchema from "../../Schemas/MenuSchema/SuggestCardSchema.json";
import { getItemPackage } from "../menu-components/getItemPackage";
export function RenderSuggestCards({
  suggestContainerType,
  items,
  schemaActions,
  suggestFieldsType,
}) {
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };
  const { cartState, cartReducerDispatch, cartFieldsType } = useCart();
  const chunkedItems = chunkArray(items, 4); // Creates groups of 4 items each
  const BOX_high = scale(300);
  const BOX_width = scale(300);
  switch (suggestContainerType) {
    case 0:
      return (
        <>
          {items.map((item) => (
            <SuggestCard
              key={item[suggestFieldsType.idField]}
              schemaActions={schemaActions}
              item={getItemPackage(
                item,
                cartState.rows,
                SuggestCardSchema,
                suggestFieldsType
              )}
            />
          ))}
        </>
      );

    case 1:
      return (
        <>
          {chunkedItems.map((group, groupIndex) => (
            <View
              key={`group-${groupIndex}`}
              style={{
                width: BOX_width,
                height: BOX_high,
                backgroundColor: theme.body,
                borderRadius: scale(8),
                padding: scale(8),
                marginRight:
                  groupIndex < chunkedItems.length - 1 ? scale(8) : 0,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignContent: "flex-start",
              }}
            >
              {group.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: "48%",
                    height: "50%", // two columns per row with small gap
                    marginBottom: scale(8),
                  }}
                >
                  <SuggestCard
                    item={item}
                    boxScale={BOX_high}
                    imageStyle={{
                      width: scale(110),
                      height: scale(90),
                    }}
                    schemaActions={schemaActions}
                    showPrice={false}
                  />
                </View>
              ))}
            </View>
          ))}
        </>
      );

    default:
      return null;
  }
}
