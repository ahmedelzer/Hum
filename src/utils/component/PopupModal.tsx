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

const PopupModal = ({
  haveFooter = true,
  isOpen,
  onClose,
  onSubmit,
  control,
  schema,
  errors,
  disable,
  headerTitle = "Invite your team",
  isFormModal = true,
  children,
}) => {
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
              row={{}}
              errorResult={errors}
              control={control}
            />
          )}
          {children && children}
        </ModalBody>
          {haveFooter&&(<ModalFooter>
          <Button
            isDisabled={disable}
            variant="outline"
            action="secondary"
            onPress={onClose}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={onSubmit} isDisabled={disable}>
            <ButtonText>Save</ButtonText>
          </Button>
        </ModalFooter>)}
        
      </ModalContent>
    </Modal>
  );
};

export default PopupModal;
