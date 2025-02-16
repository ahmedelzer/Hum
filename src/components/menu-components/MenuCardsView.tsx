import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { I18nManager, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Box, HStack, Pressable, Text, VStack } from "../../../components/ui";
import { LocalizationContext } from "../../../context/LocalizationContext";
import {
  getAllMenuItems,
  updateCategory,
} from "../../reducers/MenuItemReducer";
import { initialState } from "../Pagination/initialState";
import reducer from "../Pagination/reducer";
import MenuCardView from "./MenuCardView";
import { tabs, tabsData } from "./tabsData";
// import { createRowCache } from "@devexpress/dx-react-grid";
import { useNavigation } from "@react-navigation/native";
import { SetResponsiveContainer } from "../../utils/SetResponsiveContainer";
import ActionBar from "../cards/ActionBar";
import HeaderParent from "../header/HeaderParent";
import { createRowCache } from "../Pagination/createRowCache";
const VIRTUAL_PAGE_SIZE = 4;

const MenuCardsView = ({ menuCardItem, row, setRow }: any) => {
  const products = useSelector((state) => state.menuItem.menuItem);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const imageView = menuCardItem?.dashboardFormSchemaParameters?.find(
    (item: any) => item?.parameterType === "imagePath"
  );
  const activeTab = useSelector((state) => state.menuItem.currentCategory);

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
    const data = tabsData.filter((tab) => tab.categoryId === activeTab.id);

    const fetchProducts = () => {
      dispatch(getAllMenuItems(data));
    };
    fetchProducts();
  }, []);
  // console.log("====================================");
  // console.log(products);
  // console.log("====================================");
  const [state, reducerDispatch] = useReducer(
    reducer,
    initialState(10, "products")
  );
  const [currentSkip, setCurrentSkip] = useState(1);
  const observerRef = useRef();
  // const dataSourceAPI = (query, skip, take) => {
  //   SetReoute(serviceSchema.projectProxyRoute);
  //   return buildApiUrl(query, {
  //     pageIndex: skip + 1,
  //     pageSize: take,
  //     ServiceCategoryID: serviceCategoryID,
  //   });
  // };
  const cache = createRowCache(VIRTUAL_PAGE_SIZE);
  // const getAction =
  //   serviceSchemaActions &&
  //   serviceSchemaActions.find(
  //     (action) => action.dashboardFormActionMethodType === "Get"
  //   );

  const { rows, skip, totalCount, loading } = state;
  const observerCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        console.log("Intersecting");
      }
      // if (entry.isIntersecting && rows.length < totalCount && !loading) {
      //   getRemoteRows(currentSkip, VIRTUAL_PAGE_SIZE * 2, dispatch);//todo change dispatch by reducerDispatch
      //   setCurrentSkip(currentSkip + 1);
      // }
    },
    [rows, totalCount, loading, skip]
  );
  // useEffect(() => {
  //   LoadData(
  //     state,
  //     dataSourceAPI,
  //     getAction,
  //     cache,
  //     updateRows(dispatch, cache, state),
  //     dispatch
  //   );
  // });
  // useEffect(() => {
  //   const observer = new IntersectionObserver(observerCallback, {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.1, // Trigger when 10% of the element is visible
  //   });

  //   if (observerRef.current) {
  //     observer.observe(observerRef.current);
  //   }

  //   return () => {
  //     if (observerRef.current) {
  //       observer.unobserve(observerRef.current);
  //     }
  //   };
  // }, [observerCallback]);
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isScrolledToBottom && !loading) {
      console.log("Loading more items...");

      setTimeout(() => {
        // setLoading(false);
      }, 1000); // Simulating an API call delay
    }
  };
  useEffect(() => {
    //todo:here when ws get messages like updates and delete
    //make that
    // if(WSOperation)
  }, []);
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
    <Box className="md:px-0 -mt-4" style={{ paddingBottom: 180 }}>
      <HomestayInfoTabs tabs={tabs} setRow={setRow} />
      <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll}>
        <VStack>
          {products?.map((image: any, index: any) => {
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
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
                // index={index}
              />
            );
          })}
        </VStack>
        {rows && <View ref={observerRef} className={"h-px"} />}
        {loading && (
          <View className="text-center">
            {/* <DotsLoading /> */}
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </Box>
  );
};

// const schemaActions =

const HomestayInfoTabs = ({ tabs, row, setRow }: any) => {
  const { isRTL } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.menuItem.currentCategory);
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
  // useEffect(() => {
  //   // if (products.length > 0) return;
  //   //! set here the conditions of is have new products and online users
  // }, []);
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
                onPress={() => {
                  const data = tabsData.filter(
                    (data) => data.categoryId === tab.id
                  );
                  const fetchProducts = () => {
                    dispatch(getAllMenuItems(data));
                    dispatch(updateCategory(tab));
                  };
                  fetchProducts();
                }}
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
