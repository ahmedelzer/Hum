import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Heading,
  Button,
  ButtonText,
} from "../../../components/ui"; // or your UI library
import { AntDesign } from "@expo/vector-icons";
import FormContainer from "../../components/form-container/FormContainer";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

const PopupModal = ({
  haveFooter = true,
  isOpen,
  onClose,
  onSubmit,
  control,
  schema = {},
  errors = {},
  disable = false,
  headerTitle = "Invite your team",
  isFormModal = true,
  footer = null,
  row = {},

  children,
}) => {
  const localization = useSelector((state) => state.localization.localization);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-text">
            {headerTitle}
          </Heading>
          <ModalCloseButton>
            <AntDesign name="closecircle" size={24} color="black" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          {isFormModal && (
            <FormContainer
              tableSchema={schema}
              row={row}
              errorResult={errors}
              control={control}
            />
          )}
          {children && children}
        </ModalBody>
        {haveFooter && (
          <ModalFooter>
            {footer ? (
              footer
            ) : (
              <View>
                <Button
                  isDisabled={disable}
                  variant="outline"
                  action="secondary"
                  onPress={onClose}
                >
                  <ButtonText>{localization.formSteps.popup.cancel}</ButtonText>
                </Button>
                <Button onPress={onSubmit} isDisabled={disable}>
                  <ButtonText>{localization.formSteps.popup.done}</ButtonText>
                </Button>
              </View>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
export default PopupModal;
