import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { updateFavoriteItems } from "../../reducers/MenuItemReducer";
import { theme } from "../../Theme";
export default function FaovertCardIcon({
  fieldsType,
  item,
  withAbsolutePos = true,
}) {
  const favoriteItems = useSelector((state) => state.menuItem.favoriteItems);
  const isFavorite = favoriteItems.some(
    (favItem) => favItem[fieldsType.idField] === item[fieldsType.idField]
  );
  const dispatch = useDispatch();

  function handleFavoritePress() {
    if (isFavorite) {
      dispatch(updateFavoriteItems({ items: [item], ope: "delete" }));
    } else {
      dispatch(updateFavoriteItems({ items: [item], ope: "add" }));
    }
  }
  return (
    <TouchableOpacity
      onPress={handleFavoritePress}
      style={{
        // position: "absolute",
        // top: scale(8),
        // left: scale(8),
        backgroundColor: theme.body,
        borderRadius: 20,
        padding: 6,
        zIndex: 10,
        opacity: 0.8,
      }}
      className={withAbsolutePos ? "absolute top-2 left-2" : "items-center"}
    >
      <FontAwesome
        name={isFavorite ? "heart" : "heart-o"}
        size={20}
        color={"red"}
      />
    </TouchableOpacity>
  );
}
