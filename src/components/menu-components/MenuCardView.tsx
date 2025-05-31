import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { Card } from "../../../components/ui";
import SetComponentsPlatforms from "../../utils/component/SetComponentsPlatforms";
import { MenuCard, MenuCardWeb } from "../cards";
import NodeMenuItemsSchemaActions from "../../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";

//todo update att when any param changes
//todo then take att and make utility that helps to get the correct item form items by attribute so the utility with make sure that the two objs is the same
//todo then update the item my item that get from the attributes

const MenuCardView = ({
  itemPackage,
  selectedItems,
  setSelectedItems,
  schemaActions,
}) => {
  //!uncomment the attribute
  const [item, setItem] = useState(itemPackage);
  // const [att, setAtt] = useState(item.attribute);
  const navigation = useNavigation();
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);
  const selected = selectedItems.find(
    (selected) => selected[fieldsType.idField] === item[fieldsType.idField]
  );
  // Form control
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    // defaultValues: att, // Set initial form values
  });

  // Watch form values and update att when they change
  // useEffect(() => {
  //   const subscription = watch((values) => {
  //     setAtt(values);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  // useEffect(() => {
  //   const findMatchingItem = (items, att) => {
  //     return items.find((item) => areObjectsEqual(item.attribute, att));
  //   };
  //   if (itemPackage.items) {
  //     setItem(findMatchingItem(itemPackage.items, att));
  //   }
  // }, [att]);
  // useEffect(() => {
  //   setItem(itemPackage);
  //   setAtt(itemPackage.attribute);
  // }, [itemPackage]);
  const handleLongPress = () => {
    if (selected) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) =>
            selectedItem[fieldsType.idField] !== selected[fieldsType.idField]
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handlePress = () => {
    if (selectedItems.length > 0) {
      handleLongPress();
    } else {
      navigation.navigate("DetailsProductScreen", {
        item: item,
        fieldsType: fieldsType,
        schemaActions: schemaActions,
      });
    }
  };
  return (
    <Pressable onPress={handlePress} onLongPress={handleLongPress}>
      <Card
        className={`items-center rounded-xl overflow-hidden my-4 border-1 ${
          selected ? "border-2 border-green-500 bg-green-100" : "bg-dark_card"
        }`}
      >
        <SetComponentsPlatforms
          components={[
            {
              platform: "android",
              component: (
                <MenuCard
                  item={itemPackage}
                  fieldsType={fieldsType}
                  schemaActions={schemaActions}
                />
              ),
            },
            {
              platform: "ios",
              component: (
                <MenuCard
                  item={itemPackage}
                  fieldsType={fieldsType}
                  schemaActions={schemaActions}
                />
              ),
            },
            {
              platform: "web",
              component: (
                <MenuCardWeb item={itemPackage} fieldsType={fieldsType} />
              ),
            },
          ]}
        />

        {/* {itemPackage.attributes && (
          <ScrollView className="w-full">
            <FormContainer
              tableSchema={itemPackage.attributes}
              row={att}
              errorResult={{}}
              control={control}
            />
          </ScrollView>
        )} */}
      </Card>
    </Pressable>
  );
};

export default MenuCardView;
