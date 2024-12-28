import React from "react";
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

const LogoutAlertDialog = ({
  openLogoutAlertDialog,
  setOpenLogoutAlertDialog,
}: any) => {
  const handleClose = () => {
    setOpenLogoutAlertDialog(false);
  };
  const handleLogout = async () => {
    await deleteKey("token");
    DevSettings.reload();
  };

  return (
    <AlertDialog isOpen={openLogoutAlertDialog} onClose={handleClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="p-4">
        <AlertDialogHeader>
          <Heading>Logout</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody className="" contentContainerClassName="">
          <Text className="mb-6">Are you sure, you want to logout?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="outline" action="secondary" onPress={handleClose}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button action="negative" onPress={handleLogout}>
            <ButtonText className="text-white">Logout</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutAlertDialog;
