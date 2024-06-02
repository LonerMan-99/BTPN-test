import {
 Box,
 Button,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Input,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { closePopupAddContact, saveFormAddContact } from "@/slicer/home-slicer";
import { addContactValidationSchema } from "@/validation/add-contact.validation";
import { ContactRequest } from "@/data/model/home.model";

interface props {
 onSubmit: () => void;
 isLoading?: boolean;
}

const FormAddContact = ({ onSubmit, isLoading }: props) => {
 const dispatch = useDispatch();

 const initialValues = {
  firstName: "",
  lastName: "",
  age: "",
 };

 const handleSubmit = (values: ContactRequest) => {
  dispatch(saveFormAddContact(values));
  onSubmit();
 };

 return (
  <Formik
   initialValues={initialValues}
   onSubmit={handleSubmit}
   validationSchema={addContactValidationSchema}
  >
   {(formik) => (
    <Form>
     <Field name="firstName">
      {({ field, form }: any) => (
       <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
        <FormLabel>First name</FormLabel>
        <Input {...field} id="firstname" />
        <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
       </FormControl>
      )}
     </Field>

     <Field name="lastName">
      {({ field, form }: any) => (
       <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
        <FormLabel>Last name</FormLabel>
        <Input {...field} id="lastname" />
        <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
       </FormControl>
      )}
     </Field>

     <Field name="age">
      {({ field, form }: any) => (
       <FormControl isInvalid={form.errors.age && form.touched.age}>
        <FormLabel>Age</FormLabel>
        <Input {...field} id="age" />
        <FormErrorMessage>{form.errors.age}</FormErrorMessage>
       </FormControl>
      )}
     </Field>
     <Box
      display="flex"
      alignItems="center"
      gap={4}
      mt={6}
      justifyContent="end"
     >
      <Button variant="ghost" onClick={() => dispatch(closePopupAddContact())}>
       Close
      </Button>
      <Button type="submit" colorScheme="blue" isLoading={isLoading}>
       Submit
      </Button>
     </Box>
    </Form>
   )}
  </Formik>
 );
};

export default FormAddContact;
