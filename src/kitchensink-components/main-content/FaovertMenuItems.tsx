import React, { useContext } from "react";
import {
  Text,
  VStack,
  Card,
  HStack,
  Icon,
  Image,
} from "../../../components/ui";
import { SquareArrowUpRight } from "lucide-react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { LocalizationContext } from "../../../context/LocalizationContext";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GetMediaUrl } from "../../utils/GetMediaUrl";

const FaovertMenuItems = () => {
  const favoriteItems = useSelector((state) => state.menuItem.favoriteItems);
  const fieldsType = useSelector((state) => state.menuItem.fieldsType);

  const navigation = useNavigation();
  const { localization } = useContext(LocalizationContext);
  return (
    favoriteItems.length > 0 && (
      <>
        <HStack className="flex-1 items-center justify-between">
          <Text>{localization.Hum_screens.home.faovert}</Text>
          <Text className="text-primary-custom">{favoriteItems.length}</Text>
        </HStack>
        <HStack className="flex-wrap flex-row flex mx-2 mb-6">
          {favoriteItems.map((favoriteItem) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailsProductScreen", favoriteItem)
              }
              key={favoriteItem[fieldsType.idField]}
              className="relative w-1/3 md:w-1/4 aspect-square shrink border-[4px] border-card rounded-lg"
            >
              <Card
                style={{
                  borderRadius: 12,
                }}
              >
                <VStack className="items-center">
                  <Image
                    source={GetMediaUrl(
                      favoriteItem[fieldsType.imageView],
                      "publicImage"
                    )}
                    className="!size-12 md:!size-28 aspect-square rounded-full"
                    resizeMode="cover"
                    alt=""
                  />
                  <Text className="mt-2 text-sm font-bold">
                    {favoriteItem[fieldsType.text]}
                  </Text>
                </VStack>
                <Icon
                  as={() => (
                    <AntDesign
                      name="heart"
                      size={16}
                      className="absolute bottom-1 left-1  !text-red-500"
                    />
                  )}
                />
              </Card>
            </TouchableOpacity>
          ))}
        </HStack>
      </>
    )
  );
};

export default FaovertMenuItems;
