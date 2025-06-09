import React from "react";
import { DevSettings } from "react-native";
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
import { deleteKey } from "../store/zustandStore";

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
