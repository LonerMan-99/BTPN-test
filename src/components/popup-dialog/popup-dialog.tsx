import React from "react";
import {
 Button,
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalFooter,
 ModalBody,
 ModalCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { closePopupAddContact } from "@/slicer/home-slicer";

interface props {
 onShownModal: boolean;
 onClosedModal?: boolean;
 children?: React.ReactElement;
}

const PopupDialog = ({ onShownModal, children }: props) => {
 const dispatch = useDispatch();

 return (
  <Modal
   isOpen={onShownModal}
   onClose={() => dispatch(closePopupAddContact())}
   isCentered
  >
   <ModalOverlay />
   <ModalContent>
    <ModalHeader>Add Contact</ModalHeader>
    <ModalCloseButton />
    <ModalBody padding="8px 16px">{children}</ModalBody>
   </ModalContent>
  </Modal>
 );
};

export default PopupDialog;
