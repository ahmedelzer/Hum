import {
  Feather,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Divider,
  Heading,
  HStack,
  Link,
  LinkText,
  Text,
  VStack,
} from "../../components/ui";
import { useAuth } from "../../context/auth";
import LanguageSelector from "../components/language/LanguageSelector";
import {
  CollapsibleNavigation,
  CollapsibleSection,
} from "../utils/component/Collapsible";
import LogoutAlertDialog from "./LogoutAlertDialog";
import { theme } from "../Theme";
import OrderCollapse from "../utils/component/OrderCollapse";

const MobileProfilePage = () => {
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const { userGust, user } = useAuth();

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ScrollView style={{ flex: 1, height: "100%" }}>
      <VStack className="flex-1" space="lg">
        {!userGust && (
          <>
            <Heading className="mb-1">Profile</Heading>
            <ProfileCard />
            <Divider className="my-2" />
            <CollapsibleSection
              title="Personal Info"
              icon={() => <Feather name="user" size={22} />}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
              withSpecialAction={true}
            >
              <Text>Details about personal information go here.</Text>
            </CollapsibleSection>
            <Divider className="my-2" />
            <CollapsibleSection
              title="Setting"
              icon={() => <Feather name="settings" size={22} />}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
            >
              <LanguageSelector key={1} />
            </CollapsibleSection>
            <Divider className="my-2" />
            <CollapsibleSection
              title="Payment Settings"
              icon={() => <Feather name="credit-card" size={22} />}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
            >
              <Text>Manage payment methods.</Text>
            </CollapsibleSection>
            <Divider className="my-2" />
            <CollapsibleSection
              title="Security"
              icon={() => <Feather name="lock" size={22} />}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
            >
              <Text>Update password and security settings.</Text>
            </CollapsibleSection>
            <Divider className="my-2" />
            <CollapsibleNavigation
              title="Notifications"
              icon={() => <Feather name="bell" size={22} />}
              screenName={"NotificationScreen"}
            />
            <Divider className="my-2" />
            <CollapsibleSection
              title="Orders & Purchases"
              icon={() => <FontAwesome6 name="tablets" size={22} />}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
            >
              <OrderCollapse />
            </CollapsibleSection>
            <Divider className="my-2" />
            <CollapsibleSection
              title="Wishlist"
              icon={() => <MaterialIcons name="window" size={22} />}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
            >
              <Text>Manage your saved products.</Text>
            </CollapsibleSection>
            <Divider className="my-2" />
            <CollapsibleNavigation
              title="Cart"
              icon={() => <Feather name="shopping-cart" size={22} />}
              screenName={"Cart"}
            />
            <Divider className="my-2" />
            <CollapsibleSection
              title="Referral & Rewards"
              icon={() => <Feather name="gift" size={22} />}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
            >
              <Text>Check your earned rewards and referrals.</Text>
            </CollapsibleSection>
            <Divider className="my-2" />
            <CollapsibleSection
              title="Support"
              icon={() => <Feather name="headphones" size={22} />}
              expandedSection={expandedSection}
              toggleSection={toggleSection}
            >
              <Text>Contact support or get help.</Text>
            </CollapsibleSection>
          </>
        )}
        <LogoutButton setOpenLogoutAlertDialog={setOpenLogoutAlertDialog} />
      </VStack>
      <LogoutAlertDialog
        setOpenLogoutAlertDialog={setOpenLogoutAlertDialog}
        openLogoutAlertDialog={openLogoutAlertDialog}
      />
    </ScrollView>
  );
};
const ProfileCard = () => {
  const { userGust, user } = useAuth();

  return (
    <HStack className="justify-between items-center">
      <HStack space="md" className="items-center">
        <Avatar className="bg-body">
          <AvatarFallbackText>{user.Username}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
            }}
          />
        </Avatar>
        <VStack>
          <Text className="text-text text-lg">{user.Username}</Text>
          <VStack>
            <HStack space="xs" className="items-center">
              <FontAwesome
                name="credit-card"
                size={14}
                color={theme.accentHover}
              />
              <Text className="text-primary-custom text-sm">
                Credit: $150.00
              </Text>
            </HStack>
            <HStack space="xs" className="items-center">
              <FontAwesome
                name="star"
                size={14}
                className="!text-yellow-400"
                // color="#facc15"
              />
              <Text className="text-primary-custom text-sm">Points: 3200</Text>
            </HStack>
          </VStack>
        </VStack>
      </HStack>
      <LanguageSelector key={1} />
    </HStack>
  );
};

const LogoutButton = ({ setOpenLogoutAlertDialog }) => {
  const localization = useSelector((state) => state.localization.localization);

  return (
    <Button
      action="secondary"
      variant="outline"
      onPress={() => setOpenLogoutAlertDialog(true)}
    >
      <ButtonText>{localization.Hum_screens.profile.logOut.logOut}</ButtonText>
    </Button>
  );
};

export default MobileProfilePage;
