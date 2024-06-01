"use client";
import { useState } from "react";
import Header from "@/components/header/header";
import Navigation from "@/components/navigation/navigation";
import { NAVIGATION_CONSTANT } from "@/constant/navigation.constant";
import {
 Alert,
 AlertIcon,
 Box,
 Button,
 FormControl,
 FormLabel,
 Image,
 Input,
 Spinner,
 useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useDetailRepository } from "@/data/repository/detail.repository";
import { useMutation, useQuery } from "@tanstack/react-query";
import Footer from "@/components/footer/footer";
import { error } from "console";

const Detail = () => {
 const router = useRouter();
 const contactId = router.query.contactId;
 const { getDetailContact, putUpdateExistingContact } = useDetailRepository();
 const [isDisabledInput, setIsDisabledInput] = useState(true);

 const [newData, setNewData] = useState({
  photo: "",
  firstName: "",
  lastName: "",
  age: "",
 });

 const {
  isOpen: isVisible,
  onClose,
  onOpen,
 } = useDisclosure({ defaultIsOpen: false });

 const { data, isFetching, refetch } = useQuery({
  queryKey: ["detail-contact", contactId],
  queryFn: async () => {
   try {
    const response = await getDetailContact(contactId);
    return response;
   } catch (error) {
    throw error;
   }
  },
 });

 const mutationUpdateExistingContact = useMutation({
  mutationFn: (request: any) => putUpdateExistingContact(contactId, request),
  onSuccess: () => {
   refetch();
   setIsDisabledInput(true);
  },
  onError: (error) => {},
  onSettled: () => {
   onOpen();
   setTimeout(() => {
    onClose();
   }, 2000);
  },
 });

 const handleInputChange = (e: any) => {
  const { name, value } = e.target;
  setNewData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };

 const onSubmitData = (e: any) => {
  e.preventDefault();
  const updatedData = {
   ...data,
   ...(newData.firstName && { firstName: newData.firstName }),
   ...(newData.lastName && { lastName: newData.lastName }),
   ...(newData.age && { age: newData.age }),
   ...(newData.photo && { photo: newData.photo }),
  };

  mutationUpdateExistingContact.mutate(updatedData);
 };

 return (
  <Box maxWidth={480} height="100vh" margin="0 auto" position="relative">
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
   <Box marginTop={5} marginBottom={3} padding="0 8px">
    <Navigation items={NAVIGATION_CONSTANT} />
   </Box>
   <Box padding="0 16px">
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
      <form onSubmit={onSubmitData}>
       <FormControl marginTop={4}>
        <FormLabel>First name</FormLabel>
        <Input
         name="firstName"
         placeholder="First name"
         defaultValue={data?.firstName}
         isDisabled={isDisabledInput}
         onChange={handleInputChange}
        />
        <FormLabel mt={2}>Last name</FormLabel>
        <Input
         name="lastName"
         placeholder="Last name"
         defaultValue={data?.lastName}
         isDisabled={isDisabledInput}
         onChange={handleInputChange}
        />

        <FormLabel mt={2}>Age</FormLabel>
        <Input
         name="age"
         type="number"
         placeholder="Your age"
         defaultValue={data?.age}
         isDisabled={isDisabledInput}
         onChange={handleInputChange}
        />
       </FormControl>

       <Box
        display="flex"
        alignItems="center"
        gap={4}
        mt={6}
        justifyContent="end"
       >
        <Button
         size="lg"
         colorScheme="teal"
         isDisabled={!isDisabledInput}
         onClick={() => setIsDisabledInput(false)}
        >
         Edit
        </Button>
        <Button
         isLoading={mutationUpdateExistingContact.isPending}
         size="lg"
         type="submit"
         colorScheme="blue"
         isDisabled={isDisabledInput}
        >
         Submit
        </Button>
       </Box>
      </form>
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
