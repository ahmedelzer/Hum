import ResponsiveContainer from "../kitchensink-components/auth/layout/ResponsiveContainer";

export const SetResponsiveContainer = (screen, setMargin = false) => {
  return (
    <ResponsiveContainer style={""} setMargin={setMargin}>
      {screen}
    </ResponsiveContainer>
  );
};
