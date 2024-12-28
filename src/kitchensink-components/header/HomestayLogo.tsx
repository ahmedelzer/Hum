import React, { useContext } from "react";
import { Image } from "@/components/ui";

const HomestayLogo = () => {
  return (
    <Image
      source={require("../../../assets/light-logo.svg")}
      alt="homestaylogo"
      className="h-[42px] w-[142px]"
    />
  );
};

export default HomestayLogo;
