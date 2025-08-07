import { StatusBar } from "react-native";
import ResponsiveContainer from "../../kitchensink-components/auth/layout/ResponsiveContainer";
import { theme } from "../../Theme";

export const SetResponsiveContainer = (
  screen,
  setMargin = false,
  style = {}
) => {
  return (
    <ResponsiveContainer style={style} setMargin={setMargin}>
      {screen}
    </ResponsiveContainer>
  );
};
