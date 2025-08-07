import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import {
  Box,
  Button,
  Card,
  HStack,
  Image,
  Text,
  VStack,
} from "../../../components/ui";
import { publicImageURL } from "../../../request";
import NodeMenuItemsSchemaActions from "../../Schemas/MenuSchema/NodeMenuItemsSchemaActions.json";
import { theme } from "../../Theme";
import GetIconMenuItem from "../../utils/component/GetIconMenuItem";
import { GetMediaUrl } from "../../utils/operation/GetMediaUrl";
import { RunsSpacialAction } from "../../utils/operation/RunsSpacialAction";

//!locaization
// fasimge,react-native-image-zoom-viewer
export const CarouselBox = ({ item, fieldsType }) => {
  let url = `${publicImageURL}/${item[fieldsType.imageView]}`;
  const [imageFetch, setImageFetch] = useState("");
  const indexOfLike = item.indexOflike;
  const randomID = item[fieldsType.idField];

  useEffect(() => {
    const checkImageUrl = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) {
          setImageFetch(url);
        } else {
          console.log("Image fetch failed:", res.status);
        }
      } catch (error) {
        console.log("Image fetch error:", error);
      }
    };

    checkImageUrl();
  }, [url]);

  return (
    <Box className="justify-center items-center">
      {item[fieldsType.imageView] && (
        <View>
          <Image
            source={GetMediaUrl(item[fieldsType.imageView], "publicImage")}
            alt={item[fieldsType.text]}
            className="w-auto h-[70%] rounded-xl"
            style={{
              resizeMode: "cover",
              aspectRatio: 1,
              borderRadius: moderateScale(10),
            }}
          />
        </View>
      )}
      <Card
        variant="elevated"
        className="absolute bottom-6 w-[90%] md:w-[80%] lg:w-[70%] p-4 rounded-3xl shadow-xl"
      >
        {/* {item[fieldsType.likes] && (
          <Pressable
            // onPress={() => setLikes(!likes)}
            className="absolute top-3 right-4 h-6 w-6 justify-center items-center"
          >
            <AnimatePresence>
              <Motion.View
                // key={likes ? "like" : "dislike"}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  mass: 0.9,
                  damping: 9,
                  stiffness: 300,
                }}
              >
                <MaterialCommunityIcons
                  name="heart"
                  size={24}
                  // color={likes ? "red" : "gray"}
                />
              </Motion.View>
            </AnimatePresence>
          </Pressable>
        )} */}
        <VStack space="sm">
          {item[fieldsType.text] && (
            <Text bold size="sm" className="text-primary">
              {item[fieldsType.text]}
            </Text>
          )}
          {item[fieldsType.description] && (
            <Text size="sm" className="text-primary-custom">
              {item[fieldsType.description]}
            </Text>
          )}

          <HStack space="sm" className="items-center">
            <HStack space="xs" className="items-center">
              {[...Array(4)].map((_, i) => (
                <MaterialCommunityIcons
                  key={i}
                  name="star"
                  size={16}
                  color="orange"
                />
              ))}
            </HStack>
            <Text size="sm" className="ml-2 text-card">
              4.5
            </Text>
            <Text size="sm" className="ml-2 text-card">
              8
            </Text>
            <MaterialCommunityIcons
              name="account-check"
              size={16}
              color="green"
            />
          </HStack>
          <HStack
            space="lg"
            className="items-center w-full justify-between mt-2 flex flex-row px-4 py-2"
            key={`${item[fieldsType.orders]}-${item[fieldsType.rate]}-${item[fieldsType.likes]}-${item[fieldsType.dislikes]}-${randomID}`}
          >
            <GetIconMenuItem
              count={item[fieldsType.orders]}
              iconName={"orders"}
              size={18}
              style={{ marginHorizontal: scale(1), color: theme.accent }}
            />
            <GetIconMenuItem
              count={item[fieldsType.rate]}
              iconName={"rate"}
              size={18}
              style={{ marginHorizontal: scale(1), color: theme.accent }}
              scaluton
            />
            <GetIconMenuItem
              count={item[fieldsType.likes]}
              iconName={indexOfLike == 1 ? "likes" : "likes2"}
              onPress={() =>
                RunsSpacialAction(
                  fieldsType.likes,
                  item[fieldsType.idField],
                  indexOfLike == 1 ? false : true,
                  NodeMenuItemsSchemaActions,
                  fieldsType.proxyRoute
                )
              }
              size={18}
              style={{ marginHorizontal: scale(1), color: theme.accent }}
            />
            <GetIconMenuItem
              // key={`${item[fieldsType.dislikes]}-${randomID}`}
              count={item[fieldsType.dislikes]}
              onPress={() =>
                RunsSpacialAction(
                  fieldsType.likes,
                  item[fieldsType.idField],
                  indexOfLike == -1 ? false : true,
                  NodeMenuItemsSchemaActions,
                  fieldsType.proxyRoute
                )
              }
              iconName={indexOfLike == -1 ? "dislikes" : "dislikes2"}
              size={18}
              style={{ marginHorizontal: scale(1), color: theme.accent }}
            />
          </HStack>
          <HStack space="lg" className="items-center">
            <Button variant="link">
              <Text className="font-medium text-sm">8</Text>
              <MaterialCommunityIcons
                name="cube-outline"
                size={16}
                className="ml-1 !text-accent"
              />
            </Button>
            <Button variant="link">
              <Text className="font-medium text-sm">18</Text>
              <MaterialCommunityIcons name="axe" size={16} className="ml-1" />
            </Button>
            <Button variant="link">
              <Text className="font-medium text-sm">Locate</Text>
              <MaterialCommunityIcons
                name="map-marker"
                size={16}
                className="ml-1"
              />
            </Button>
          </HStack>
        </VStack>
      </Card>
    </Box>
  );
};
