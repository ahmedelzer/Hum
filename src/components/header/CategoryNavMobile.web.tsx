import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import LanguageSelector from "../language/LanguageSelector";
const categoryNavMobileStyles = {
  container: "w-full h-full bg-card p-8",
  closeButtonWrapper: "flex justify-end mb-8 cursor-pointer",
  closeButtonIcon: "text-3xl",
  linkWrapper: "flex flex-col gap-y-8",
  link: "uppercase font-medium",
};
const CategoryNavMobile = ({ setCatNavMobile }) => {
  const navigation = useNavigation();
  const tabs = [
    { name: "Home", icon: "home" },
    { name: "MenuView", icon: "menu" },
    { name: "Profile", icon: "person" },
  ];
  return (
    <div className={categoryNavMobileStyles.container}>
      <div
        onClick={() => setCatNavMobile(false)}
        className={categoryNavMobileStyles.closeButtonWrapper}
      >
        <AntDesign
          name="closecircle"
          size={24}
          color="black"
          className={categoryNavMobileStyles.closeButtonIcon}
        />
        {/* <FiX  /> */}
      </div>
      <div className={categoryNavMobileStyles.linkWrapper}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: tab.name }], // This prevents back navigation
              });
            }}
            className={categoryNavMobileStyles.link}
            // style={styles.link}
          >
            {tab.name}
          </TouchableOpacity>
        ))}
        <div>
          <label className="uppercase mb-1 !font-primary">Language</label>
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};

export default CategoryNavMobile;
