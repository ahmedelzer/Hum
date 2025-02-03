import {
  Bell,
  Blinds,
  CreditCard,
  Gift,
  HeadsetIcon,
  Lock,
  SettingsIcon,
  ShoppingCart,
  Tablets,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
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

const MobileProfilePage = () => {
  const [openLogoutAlertDialog, setOpenLogoutAlertDialog] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ScrollView style={{ flex: 1, height: "100%" }}>
      <VStack className="flex-1" space="lg">
        <Heading className="mb-1">Profile</Heading>
        <ProfileCard />
        <Divider className="my-2" />
        <CollapsibleSection
          title="Personal Info"
          icon={User}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          <Text>Details about personal information go here.</Text>
        </CollapsibleSection>
        <Divider className="my-2" />
        <CollapsibleSection
          title="Setting"
          icon={SettingsIcon}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          {/* <View> */}
          <LanguageSelector key={1} />
          {/* </View> */}
        </CollapsibleSection>
        <Divider className="my-2" />
        <CollapsibleSection
          title="Payment Settings"
          icon={CreditCard}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          <Text>Manage payment methods.</Text>
        </CollapsibleSection>
        <Divider className="my-2" />
        <CollapsibleSection
          title="Security"
          icon={Lock}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          <Text>Update password and security settings.</Text>
        </CollapsibleSection>
        <Divider className="my-2" />
        <CollapsibleNavigation
          title="Notifications"
          icon={Bell}
          screenName={"NotificationScreen"}
        />

        <Divider className="my-2" />
        <CollapsibleSection
          title="Orders & Purchases"
          icon={Tablets}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          <Text>View and track your past orders.</Text>
        </CollapsibleSection>
        <Divider className="my-2" />
        <CollapsibleSection
          title="Wishlist"
          icon={Blinds}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          <Text>Manage your saved products.</Text>
        </CollapsibleSection>

        <Divider className="my-2" />
        <CollapsibleNavigation
          title="Cart"
          icon={ShoppingCart}
          screenName={"Cart"}
        />
        <Divider className="my-2" />
        <CollapsibleSection
          title="Referral & Rewards"
          icon={Gift}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          <Text>Check your earned rewards and referrals.</Text>
        </CollapsibleSection>
        <Divider className="my-2" />
        <CollapsibleSection
          title="Support"
          icon={HeadsetIcon}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
        >
          <Text>Contact support or get help.</Text>
        </CollapsibleSection>
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
        <Avatar className="bg-primary-500">
          <AvatarFallbackText>Henry Stan</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
            }}
          />
        </Avatar>
        <VStack>
          <Text>Henry Stan</Text>
          <Link>
            <LinkText className="text-typography-500 no-underline">
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
