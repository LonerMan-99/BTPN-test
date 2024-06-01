"use client";
import Header from "@/components/header/header";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
 openPopupAddContact,
 closePopupAddContact,
 setContacts,
} from "@/slicer/home-slicer";
import {
 Box,
 Text,
 Skeleton,
 Spinner,
 Alert,
 AlertIcon,
 useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import Navigation from "@/components/navigation/navigation";
import { NAVIGATION_CONSTANT } from "@/constant/navigation.constant";
import ContactCard from "@/components/contact-card/contact-card";
import { useHomeRepository } from "@/data/repository/home.repository";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactsListItem } from "@/data/model/home.model";
import PopupDialog from "@/components/popup-dialog/popup-dialog";
import { RootState } from "@/store/store";
import FormAddContact from "@/components/form/form-add-contact";
import Empty from "@/components/empty/empty";
import Footer from "@/components/footer/footer";
import { error } from "console";

const Home = () => {
 const router = useRouter();
 const isPopupAddContactOpen = useSelector(
  (state: RootState) => state.homeSlice.isPopupOpen
 );
 const addContactRequest = useSelector(
  (state: RootState) => state.homeSlice.addFormData
 );

 const dispatch = useDispatch();
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

 return (
  <Box maxWidth={480} height="100vh" margin="0 auto">
   <PopupDialog onShownModal={isPopupAddContactOpen}>
    <FormAddContact onSubmit={() => mutationPostAddNewContact.mutate()} />
   </PopupDialog>
   {isVisible && (
    <Alert
     status={handleStatusAlert()}
     zIndex={999}
     maxWidth={480}
     position="fixed"
     top={0}
     left="auto"
     right="auto"
     w="100%"
    >
     <AlertIcon />
     {showAlertTextSuccess()}
    </Alert>
   )}
   <Box
    maxWidth={480}
    position="fixed"
    top={0}
    left="auto"
    right="auto"
    w="100%"
    zIndex={100}
   >
    <Header
     isShownButton={true}
     buttonHeaderIcon={<AddIcon />}
     eventButtonHeader={() => dispatch(openPopupAddContact())}
    />
   </Box>
   <Box marginTop={24} marginBottom={5} padding="0 8px">
    <Navigation items={NAVIGATION_CONSTANT} />
   </Box>
   <Box padding="0 16px" paddingBottom="30px">
    <Text fontWeight="bold" fontSize={11}>
     All Contacts
    </Text>
    {isFetching || mutationPostAddNewContact.isPending ? (
     <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      margin="5rem auto"
      display="flex"
     />
    ) : (
     <Box display="flex" flexDirection="column" gap={4} padding="16px 0">
      {data?.length === 0 ? (
       <Empty />
      ) : (
       data?.map((item: ContactsListItem) => (
        <Skeleton key={item.id} isLoaded={!isFetching}>
         <ContactCard
          data={item}
          onDelete={() => mutationDeleteContact.mutate(item?.id)}
          isDeleteLoading={mutationDeleteContact.isPending}
          onDetail={() => router.push(`/detail/${item?.id}`)}
         />
        </Skeleton>
       ))
      )}
     </Box>
    )}
   </Box>
   <Box
    maxWidth={480}
    position="fixed"
    bottom={0}
    left="auto"
    right="auto"
    w="100%"
    zIndex={100}
   >
    <Footer />
   </Box>
  </Box>
 );
};

export default Home;
