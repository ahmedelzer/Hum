import React, { useContext, useEffect } from "react";
import { I18nManager, ScrollView } from "react-native";
import { Box, HStack, Pressable, Text, VStack } from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
import MenuCardView from "./MenuCardView";
import { getAllProducts, getProducts } from "../../reducers/ProductReducer";
import { useDispatch, useSelector } from "react-redux";

const tabsData = [
  {
    name: "Picks for you",
    data: [
      {
        id: 1,
        name: "ImageView Inn",
        description:
          "Enjoy a cozy stay with scenic views at ImageView Inn, complete with all modern amenities.",
        price: 4576.0,
        rating: 4.9,
        location: "401 Platte River Rd, Gothenburg, United States",
        image: require("../../../assets/display/food1.jpg"),
        quantity: 0,
      },
      {
        id: 2,
        name: "Snack Box",
        description:
          "Snack Box - Original, Medium French Fries, Small Coleslaw, Pepsi Can (330 ML).",
        price: 136.0,
        rating: 4.8,
        location: "Downtown Cairo, Egypt",
        image: require("../../../assets/display/food.jpg"),
        quantity: 0,
      },
      {
        id: 3,
        name: "Snack Box2",
        description:
          "Snack Box - Original, Medium French Fries, Small Coleslaw, Pepsi Can (330 ML).",
        price: 136.0,
        rating: 4.8,
        location: "Downtown Cairo, Egypt",
        image: require("../../../assets/display/food.jpg"),
        quantity: 0,
      },
      {
        id: 4,
        name: "Snack Box3",
        description:
          "Snack Box - Original, Medium French Fries, Small Coleslaw, Pepsi Can (330 ML).",
        price: 136.0,
        rating: 4.8,
        location: "Downtown Cairo, Egypt",
        image: require("../../../assets/display/food.jpg"),
        quantity: 0,
      },
      {
        id: "0",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqg_OBzcVDnKHv1d3hyVk_WlCo43pzit4CJQ&usqp=CAU",
        name: "Icecream",
        quantity: 0,
        description:
          "Snack Box - Original, Medium French Fries, Small Coleslaw, Pepsi Can(330 ML)",
        price: 136.0,
      },
    ],
  },
  {
    name: "Discount",
    data: [
      {
        id: 3,
        name: "Discounted Stay",
        description:
          "Enjoy luxurious stays with amazing discounts at prime locations.",
        price: 3000.0,
        rating: 4.7,
        location: "El Gouna, Red Sea, Egypt",
        image: require("../../../assets/display/image28.png"),
      },
    ],
  },
  {
    name: "New king",
    data: [
      {
        id: 4,
        name: "King's Suite",
        description:
          "A royal suite experience with exclusive amenities and breathtaking views.",
        price: 12000.0,
        rating: 4.9,
        location: "Aswan, Egypt",
        image: require("../../../assets/display/food1.jpg"),
      },
    ],
  },
  {
    name: "National Parks",
    data: [
      {
        id: 5,
        name: "National Park Retreat",
        description:
          "Explore nature at its best with a stay amidst the lush greenery of national parks.",
        price: 5800.0,
        rating: 4.6,
        location: "Wadi El Gemal National Park, Egypt",
        image: require("../../../assets/display/image16.png"),
      },
    ],
  },
];

const tabs = [
  {
    title: "Picks for you",
  },
  {
    title: "Discount",
  },
  {
    title: "New king",
  },
];

const MenuCardsView = ({ menuCardItem, row, setRow }: any) => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const products = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const imageView = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "imagePath"
  );

  const text = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) =>
      item?.parameterType === "text" &&
      !item.isIDField &&
      item.parameterField === "menuItemName"
  );

  const description = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) =>
      item?.parameterType === "text" &&
      item.parameterField === "menuItemDescription"
  );

  const numberOfIndividuals = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "numberOfIndividuals"
  );

  const rate = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "rate"
  );

  const likes = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "likes"
  );

  const dislikes = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "dislikes"
  );

  const orders = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "orders"
  );

  const reviews = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "reviews"
  );

  // console.log(
  //   menuCardItem?.dashboardFormSchemaParameters,
  //   "menuCardItem?.dashboardFormSchemaParameters"
  // );
  const foods = [
    {
      id: "1",
      name: "Meat Pizza",
      ingredients: "Mixed Pizza",
      price: "8.30",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "2",
      name: "Cheese Pizza",
      ingredients: "Cheese Pizza",
      price: "7.10",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "3",
      name: "Chicken Burger",
      ingredients: "Fried Chicken",
      price: "5.10",
      image: require("../../../assets/display/food1.jpg"),
    },
    {
      id: "4",
      name: "Sushi Makizushi",
      ingredients: "Salmon Meat",
      price: "9.55",
      image: require("../../../assets/display/food.jpg"),
    },
  ];
  useEffect(() => {
    // if (products.length > 0) return;
    //! set here the conditions of is have new products and online users
    const data = tabsData.find(
      (tab) => tab.name.toLowerCase() === activeTab.title.toLowerCase()
    ).data;
    const fetchProducts = () => {
      dispatch(getAllProducts(data));
    };
    fetchProducts();
  }, [activeTab]);
  // console.log("====================================");
  // console.log(products);
  // console.log("====================================");
  return (
    <Box className="md:px-0 -mt-4" style={{ marginBottom: 150 }}>
      <HomestayInfoTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setRow={setRow}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack>
          {products.map((image: any, index: any) => {
            return (
              <MenuCardView
                key={index}
                item={image}
                imageView={imageView}
                text={"text"}
                description={"description"}
                numberOfIndividuals={numberOfIndividuals}
                rate={rate}
                likes={likes}
                dislikes={dislikes}
                orders={orders}
                reviews={reviews}
                // index={index}
              />
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};

// const schemaActions =

const HomestayInfoTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  row,
  setRow,
}: any) => {
  const { isRTL } = useContext(LocalizationContext);
  // const schemaActionsParams = data?.map((item: any) =>
  //   item?.dashboardFormSchemaActionQueryParams.map(
  //     (param: any) => param.dashboardFormParameterField
  //   )
  // );

  // useEffect(() => {
  //   if (schemaActionsParams) {
  //     setRow((prevRow: any) => ({ ...prevRow, schemaActionsParams }));
  //   }
  // }, [row]);

  // console.log(schemaActionsParams, "schemaActionsParams");

  // const viewConstatns = {
  //   pageIndex: 1,
  //   pageSize: 3,
  // };

  // {
  //   pageIndex: 1,
  //   pageSize: 3,
  //   keyword : 'string',
  //   filter:'asdawd'
  // }
  return (
    <Box className="border-b border-outline-50 md:border-b-0 md:border-transparent">
      <Box className="py-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row", // Adjust layout for RTL
          }}
        >
          <HStack
            space="lg"
            className={`mx-0.5 xl:gap-5 2xl:gap-6 flex ${
              I18nManager.isRTL ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {tabs.map((tab: any) => (
              <Pressable
                key={tab.title}
                className={`my-0.5 py-1 ${
                  activeTab === tab ? "border-b-[3px]" : "border-b-0"
                } !border-text hover:border-b-[3px] ${
                  activeTab === tab
                    ? "hover:border-accent"
                    : "hover:border-accent-hover"
                }`}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  size="sm"
                  className={`${
                    activeTab === tab ? "text-accent" : "text-text"
                  } font-medium ${
                    I18nManager.isRTL ? "text-right" : "text-left"
                  }`} // Dynamic alignment
                >
                  {tab.title}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default MenuCardsView;

// <Box
//   key={`${tab.titel} + ${index}`}
//   style={{
//     maxWidth: "47%",
//   }}
//   className={`my-2 lg:my-0 ${
//     index === 0 ? "lg:ml-0" : "lg:ml-2"
//   } ${index === tab.data.length - 1 ? "lg:mr-0" : "lg:mr-2"}`}>
//   <Pressable>
//     {(props: any) => {
//       return (
//         <VStack className="w-full m-0">
//           <Box className="overflow-hidden rounded-md aspect-square ">
//             {imageView && (
//               <Image
//                 source={image.src}
//                 className={`w-full h-72 ${
//                   props.hovered
//                     ? "scale-[1.04] opacity-90"
//                     : "scale-100 opacity-100"
//                 }`}
//                 alt="Explore"
//               />
//             )}
//           </Box>
//           {props.hovered && (
//             <Box className="absolute bg-[#181718] opacity-30 w-full h-full cursor-pointer" />
//           )}
//           <VStack className="mt-1">
//             {text && (
//               <Text size="sm" className="font-semibold">
//                 {image.title}
//               </Text>
//             )}
//             {description && (
//               <Text size="sm">
//                 {description.parameterTitel}
//               </Text>
//             )}
//           </VStack>
//         </VStack>
//       );
//     }}
//   </Pressable>
// </Box>
