import React from "react";
import { DevSettings, Platform } from "react-native";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text,
} from "../../components/ui";
import { persistor } from "../store/reduxStore";
import { deleteKey } from "../store/secureStore";
import { useNavigation } from "@react-navigation/native";

const LogoutAlertDialog = ({
  openLogoutAlertDialog,
  setOpenLogoutAlertDialog,
}: any) => {
  const navigation = useNavigation();

  const localization = useSelector((state) => state.localization.localization);

  const handleClose = () => {
    setOpenLogoutAlertDialog(false);
  };
  const handleLogout = async () => {
    await deleteKey("token");
    await deleteKey("rememberMe");
    persistor.purge();
    if (Platform.OS === "web") {
      window.location.href = "/";
      // window.location.reload(); // Web reload
    } else {
      DevSettings.reload();
    }
  };

  return (
    <AlertDialog isOpen={openLogoutAlertDialog} onClose={handleClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="p-4">
        <AlertDialogHeader>
          <Heading>{localization.Hum_screens.profile.logOut.logOut}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody className="" contentContainerClassName="">
          <Text className="mb-6">
            {localization.Hum_screens.profile.logOut.logOutMess}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="outline" action="secondary" onPress={handleClose}>
            <ButtonText>
              {localization.Hum_screens.profile.logOut.cancel}
            </ButtonText>
          </Button>
          <Button action="negative" onPress={handleLogout}>
            <ButtonText className="text-body">
              {localization.Hum_screens.profile.logOut.logOut}
            </ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlertDialog;
