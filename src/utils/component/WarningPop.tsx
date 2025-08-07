import { View } from "react-native";
import React from "react";
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
} from "../../../components/ui";
import { useSelector } from "react-redux";

export default function WarningPop({
  isOpen,
  handleClose,
  handleConfirm,
  headingText,
  bodyText,
  confirmText,
  cancelText = "",
}) {
  const localization = useSelector((state) => state.localization.localization);

  return (
    <AlertDialog isOpen={isOpen} onClose={handleClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="p-4">
        <AlertDialogHeader>
          <Heading>{headingText}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody className="" contentContainerClassName="">
          <Text className="mb-6">{bodyText}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="outline" action="secondary" onPress={handleClose}>
            <ButtonText>
              {cancelText || localization.Hum_screens.profile.logOut.cancel}
            </ButtonText>
          </Button>
          <Button action="negative" onPress={handleConfirm}>
            <ButtonText className="text-body">{confirmText}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
