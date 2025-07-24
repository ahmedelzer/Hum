import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ScrollView, View } from "react-native";

import { initialState } from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
import MenuCardView from "./MenuCardView";
// import { createRowCache } from "@devexpress/dx-react-grid";
import { useNavigation } from "@react-navigation/native";
import ActionBar from "../cards/ActionBar";
import HeaderParent from "../header/HeaderParent";
// import { createRowCache } from "../Pagination/createRowCache";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { buildApiUrl } from "../../../components/hooks/APIsFunctions/BuildApiUrl";
import { VStack } from "../../../components/ui";
import { useCart } from "../../../context/CartProvider";
import { useNetwork } from "../../../context/NetworkContext";
import { useWS } from "../../../context/WSProvider";
import { SetReoute } from "../../../request";
import NodeMenuItemsSchema from "../../Schemas/MenuSchema/NodeMenuItemsSchema.json";
import NodeMenuItemsSchemaActions from "../../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";
import { SetResponsiveContainer } from "../../utils/component/SetResponsiveContainer";
import { prepareLoad } from "../../utils/operation/loadHelpers";
import { ConnectToWS } from "../../utils/WS/ConnectToWS";
import { WSMessageHandler } from "../../utils/WS/handleWSMessage";
import { createRowCache } from "../Pagination/createRowCache";
import { getRemoteRows } from "../Pagination/getRemoteRows";
import { getItemPackage } from "./getItemPackage";
import { useMenu } from "../../../context/MenuProvider";

const VIRTUAL_PAGE_SIZE = 1;

const MenuCardsView = ({ isRefreshed }: any) => {
  const { cartState, cartFieldsType } = useCart();
  const { handleScroll, state } = useMenu();
  const { rows, skip, totalCount, loading } = state;
  const [selectedItems, setSelectedItems] = useState([]);
  const fieldsType = useSelector((state: any) => state.menuItem.fieldsType);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () =>
        selectedItems.length > 0 ? (
          <ActionBar
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ) : (
          SetResponsiveContainer(<HeaderParent />, false)
        ),
    });
  }, [selectedItems, navigation]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <VStack className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
        {/*!for web*/}
        {rows?.map((item: any, index: number) => (
          <View
            key={`${item[NodeMenuItemsSchema.idField]}-${index}`}
            className="h-full"
          >
            <MenuCardView
              itemPackage={getItemPackage(
                item,
                cartState.rows,
                NodeMenuItemsSchema,
                fieldsType
              )}
              schemaActions={NodeMenuItemsSchemaActions}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
            />

            {/* Insert suggestion every 2 items
            {(index + 1) % 2 === 0 && (
             <SuggestCardContainer suggestContainerType={0} />
            )}
            */}
          </View>
        ))}
      </VStack>

      {loading && (
        <View style={{ padding: 20 }}>
          <ActivityIndicator size="small" color="black" />
        </View>
      )}
    </ScrollView>
  );
};

// const schemaActions =

export default MenuCardsView;
