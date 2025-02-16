import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Feather,
  FontAwesome6,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
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
import LanguageSelector from "../components/language/LanguageSelector";
import {
  CollapsibleNavigation,
  CollapsibleSection,
} from "../utils/Collapsible";
import LogoutAlertDialog from "./LogoutAlertDialog";
import { useAuth } from "../../context/auth";

const MobileProfilePage = () => {
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const { userGust } = useAuth();

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
              <Text>View and track your past orders.</Text>
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
  return (
    <HStack className="justify-between items-center">
      <HStack space="md">
        <Avatar className="bg-body">
          <AvatarFallbackText>Henry Stan</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
            }}
          />
        </Avatar>
        <VStack>
          <Text className="text-text">Henry Stan</Text>
          <Link>
            <LinkText className="text-primary-custom no-underline">
              Show Profile
            </LinkText>
          </Link>
        </VStack>
      </HStack>
    </HStack>
  );
};

const LogoutButton = ({ setOpenLogoutAlertDialog }) => {
  return (
    <Button
      action="secondary"
      variant="outline"
      onPress={() => setOpenLogoutAlertDialog(true)}
    >
      <ButtonText>Logout</ButtonText>
    </Button>
  );
};

export default MobileProfilePage;
