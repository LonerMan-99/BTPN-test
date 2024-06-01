"use client";
import Header from "@/components/header/header";
import Navigation from "@/components/navigation/navigation";
import { NAVIGATION_CONSTANT } from "@/constant/navigation.constant";
import {
 Alert,
 AlertIcon,
 Box,
 FormLabel,
 Image,
 Spinner,
} from "@chakra-ui/react";
import React from "react";
import Footer from "@/components/footer/footer";
import useDetailHook from "@/hooks/detail.hook";
import FormUpdateContact from "@/components/form/form-update-contact";

const Detail = () => {
 const {
  data,
  isFetching,
  isVisible,
  mutationUpdateExistingContact,
  setIsDisabledInput,
  isDisabledInput,
  onSubmit,
 } = useDetailHook();

 return (
  <Box height="100vh" margin="0 auto" position="relative">
   {isVisible && (
    <Alert
     status={mutationUpdateExistingContact.isSuccess ? "success" : "error"}
     zIndex={999}
     maxWidth={480}
     position="fixed"
     top={0}
     left="auto"
     right="auto"
     w="100%"
    >
     <AlertIcon />
     {mutationUpdateExistingContact.isSuccess
      ? "Success update contact"
      : "There was an error processing your request"}
    </Alert>
   )}
   <Header />
   <Box
    maxW={480}
    margin="0 auto"
    marginTop={5}
    marginBottom={3}
    padding="0 8px"
   >
    <Navigation items={NAVIGATION_CONSTANT} />
   </Box>
   <Box padding="0 16px" maxW={480} margin="0 auto">
    {isFetching ? (
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
     <Box>
      <FormLabel>Photo</FormLabel>
      <Image
       w={58}
       h={58}
       objectFit="cover"
       borderRadius="full"
       src={data?.photo}
       fallbackSrc="https://svgshare.com/i/4V0.svg"
       alt="photo"
      />
      <Box marginTop={6}>
       <FormUpdateContact
        data={data}
        handleSubmit={onSubmit}
        isFieldDisabled={isDisabledInput}
        setIsDisabledInput={() => setIsDisabledInput(false)}
       />
      </Box>
     </Box>
    )}
   </Box>
   <Box w="100%" position="absolute" left={0} bottom={0} right={0}>
    <Footer />
   </Box>
  </Box>
 );
};

export default Detail;
