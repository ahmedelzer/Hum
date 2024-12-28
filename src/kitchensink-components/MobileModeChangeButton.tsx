import React, { useContext } from "react";
import { Fab, FabIcon } from "../../components/ui";
import { Moon, Sun } from "lucide-react-native";

const MobileModeChangeButton = () => {
  return (
    <Fab
      onPress={() => console.log("MobileModeChangButton")}
      className="md:hidden bottom-4 right-4">
      <FabIcon as={Moon} className="fill-typography-50" />
    </Fab>
  );
};

export default MobileModeChangeButton;
