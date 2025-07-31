import React, { useEffect, useState } from "react";
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
import { StyleSheet, View, ScrollView, Platform } from "react-native";

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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (Platform.OS === "web") {
      const handleScroll = () => {
        setScrollY(window.scrollY || 0);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent
        style={[
          {
            position: "absolute",
            transform: [{ translateX: -0.5 * window.innerWidth }],
          },
        ]}
      >
        <ModalHeader>
          <Heading size="md" className="text-text">
            {headerTitle}
          </Heading>
          <ModalCloseButton>
            <AntDesign name="closecircle" size={24} color="black" />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ maxHeight: 400, flex: 1 }}
          >
            {isFormModal && (
              <FormContainer
                tableSchema={schema}
                row={row}
                errorResult={errors}
                control={control}
              />
            )}
            {children && children}
          </ScrollView>
        </ModalBody>

        {haveFooter && (
          <ModalFooter>
            {footer ? (
              footer
            ) : (
              <View className="flex-row justify-between gap-2">
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
