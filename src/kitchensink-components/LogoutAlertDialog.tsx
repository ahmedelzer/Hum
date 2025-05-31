import React, { useContext } from "react";
import {
  Text,
  Heading,
  Icon,
  Button,
  CloseIcon,
  ButtonText,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "../../components/ui";
import { deleteKey } from "../store/zustandStore";
import { DevSettings } from "react-native";
import { LocalizationContext } from "../../context/LocalizationContext";
import { persistor } from "../store/reduxStore";
import { useSelector } from "react-redux";

const LogoutAlertDialog = ({
  openLogoutAlertDialog,
  setOpenLogoutAlertDialog,
}: any) => {
  const localization = useSelector((state) => state.localization.localization);

  const handleClose = () => {
    setOpenLogoutAlertDialog(false);
  };
  const handleLogout = async () => {
    await deleteKey("token");
    persistor.purge();
    DevSettings.reload();
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
