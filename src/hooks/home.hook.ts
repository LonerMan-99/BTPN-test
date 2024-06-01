import React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useHomeRepository } from "@/data/repository/home.repository";
import { useDisclosure } from "@chakra-ui/react";
import {
 openPopupAddContact,
 closePopupAddContact,
 setContacts,
} from "@/slicer/home-slicer";

const useHomeHook = () => {
 const router = useRouter();
 const dispatch = useDispatch();
 const isPopupAddContactOpen = useSelector(
  (state: RootState) => state.homeSlice.isPopupOpen
 );
 const addContactRequest = useSelector(
  (state: RootState) => state.homeSlice.addFormData
 );

 const { getListAllContacts, deleteContact, postAddNewContact } =
  useHomeRepository();

 const {
  isOpen: isVisible,
  onClose,
  onOpen,
 } = useDisclosure({ defaultIsOpen: false });

 const { data, isFetching, refetch } = useQuery({
  queryKey: ["all-contacts-list"],
  queryFn: async () => {
   try {
    const response = await getListAllContacts();
    dispatch(setContacts(response));
    return response.data;
   } catch (error) {
    onOpen();
    setTimeout(() => {
     onClose();
    }, 1500);
   }
  },
 });

 const mutationPostAddNewContact = useMutation({
  mutationFn: () => postAddNewContact(addContactRequest),
  onSuccess: () => {
   refetch();
  },
  onError: (error) => {},
  onSettled: () => {
   dispatch(closePopupAddContact());
   onOpen();
   setTimeout(() => {
    onClose();
   }, 1500);
  },
 });

 const mutationDeleteContact = useMutation({
  mutationFn: (contactId: string) => deleteContact(contactId),
  onSuccess: () => {
   refetch();
  },
  onError: (error) => {},
  onSettled: () => {
   onOpen();
   setTimeout(() => {
    onClose();
   }, 1500);
  },
 });

 const handleStatusAlert = (): any => {
  if (mutationPostAddNewContact.isSuccess || mutationDeleteContact.isSuccess)
   return "success";

  return "error";
 };

 const showAlertTextSuccess = (): string => {
  if (mutationPostAddNewContact.isSuccess) return "Success add new contact";
  if (mutationDeleteContact.isSuccess) return "Success add delete contact";

  return "There was an error processing your request";
 };
 return {
  data,
  isFetching,
  mutationPostAddNewContact,
  mutationDeleteContact,
  router,
  dispatch,
  isPopupAddContactOpen,
  handleStatusAlert,
  showAlertTextSuccess,
  isVisible,
 };
};

export default useHomeHook;
