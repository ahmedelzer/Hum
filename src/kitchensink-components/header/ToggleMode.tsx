import React, { useContext } from "react";
import { Icon, MoonIcon, SunIcon, Pressable } from "../../../components/ui";

const ToggleMode = () => {
  // const { colorMode, toggleColorMode } = useContext(ThemeContext);

  return (
    // <Pressable onPress={toggleColorMode}>
    <Pressable onPress={() => console.log("switched")}>
      <Icon
        as={MoonIcon}
        size="xl"
        className="stroke-background-700 fill-background-700"
      />
    </Pressable>
  );
};

export default ToggleMode;
