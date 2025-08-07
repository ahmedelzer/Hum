import { View, Text } from "react-native";
import React from "react";
import MenuCardView from "../menu-components/MenuCardView";
import { CarouselBox } from "./CarouselBox";
import { MenuCard } from "./MenuCard";
import SuggestCard from "./SuggestCard";
import AddCard from "./AddCard";

export default function GetCartByType({ typeCards, ...props }) {
  switch (typeCards) {
    case "MenuCardView":
      <MenuCardView {...props} />;
    case "CarouselBox":
      <CarouselBox {...props} />;
    case "MenuCard":
      <MenuCard {...props} />;
    case "SuggestCard":
      <SuggestCard {...props} />;
    case "AddCard":
      <AddCard {...props} />;
  }
}
