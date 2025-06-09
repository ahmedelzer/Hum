import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  Box,
  HStack,
} from "../../../components/ui";
import { Text } from "react-native";

// Example data
const orders = [
  { id: "ORD001", date: "2025-06-09", status: "Shipped", total: "$120.00" },
  { id: "ORD002", date: "2025-06-07", status: "Processing", total: "$95.50" },
  { id: "ORD003", date: "2025-06-05", status: "Delivered", total: "$40.75" },
];

const OrderGridRow = ({ order }) => (
  <HStack className="border-b border-gray-200 py-2 px-2">
    <Text className="flex-1 text-xs">{order.id}</Text>
    <Text className="flex-1 text-xs">{order.date}</Text>
    <Text className="flex-1 text-xs">{order.status}</Text>
    <Text className="flex-1 text-xs">{order.total}</Text>
  </HStack>
);

const OrderCollapse = () => {
  return (
    <Accordion defaultValue="orders" isCollapsible isMultiple>
      <AccordionItem value="orders">
        <AccordionHeader>
          <HStack space="sm" alignItems="center">
            <FontAwesome name="shopping-bag" size={16} color="#0f172a" />
            <Text className="font-bold text-base text-text">My Orders</Text>
          </HStack>
        </AccordionHeader>
        <AccordionContent>
          <Box className="p-2 bg-white rounded-lg">
            <HStack className="border-b border-gray-300 py-2 px-2 bg-gray-100">
              <Text className="flex-1 text-xs font-bold">Order ID</Text>
              <Text className="flex-1 text-xs font-bold">Date</Text>
              <Text className="flex-1 text-xs font-bold">Status</Text>
              <Text className="flex-1 text-xs font-bold">Total</Text>
            </HStack>
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <OrderGridRow order={item} />}
            />
          </Box>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderCollapse;
