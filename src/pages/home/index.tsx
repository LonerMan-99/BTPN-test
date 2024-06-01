"use client";
import Header from "@/components/header/header";
import { openPopupAddContact } from "@/slicer/home-slicer";
import {
 Box,
 Text,
 Skeleton,
 Spinner,
 Alert,
 AlertIcon,
} from "@chakra-ui/react";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import Navigation from "@/components/navigation/navigation";
import { NAVIGATION_CONSTANT } from "@/constant/navigation.constant";
import ContactCard from "@/components/contact-card/contact-card";

import { ContactsListItem } from "@/data/model/home.model";
import PopupDialog from "@/components/popup-dialog/popup-dialog";
import FormAddContact from "@/components/form/form-add-contact";
import Empty from "@/components/empty/empty";
import Footer from "@/components/footer/footer";
import useHomeHook from "@/hooks/home.hook";

const Home = () => {
 const {
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
 } = useHomeHook();

 return (
  <Box w="100%" maxWidth={480} margin="0 auto">
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
   <Box position="fixed" top={0} left={0} right={0} w="100%" zIndex={100}>
    <Header
     isShownButton={true}
     buttonHeaderIcon={<AddIcon />}
     eventButtonHeader={() => dispatch(openPopupAddContact())}
    />
   </Box>
   <Box marginTop={24} marginBottom={5} padding="0 8px" bg="white">
    <Navigation items={NAVIGATION_CONSTANT} />
   </Box>

   <Box padding="0 16px" paddingBottom="30px" bg="white">
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
   <Box position="fixed" bottom={0} left={0} right={0} w="100%" zIndex={100}>
    <Footer />
   </Box>
  </Box>
 );
};

export default Home;
