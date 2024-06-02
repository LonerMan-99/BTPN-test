import React from "react";
import {
 Box,
 Button,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Input,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { UpdateContactRequest } from "@/data/model/detail.model";
import { addContactValidationSchema } from "@/validation/add-contact.validation";
import { ContactRequest } from "@/data/model/home.model";

interface props {
 data: any;
 handleSubmit: (values: ContactRequest) => void;
 setIsDisabledInput: () => void;
 isFieldDisabled: boolean;
 isLoading?: boolean;
}

const FormUpdateContact = ({
 data,
 handleSubmit,
 setIsDisabledInput,
 isFieldDisabled,
 isLoading,
}: props) => {
 const onSubmit = (values: UpdateContactRequest) => {
  handleSubmit(values);
 };

 return (
  <Formik
   initialValues={{ ...data }}
   onSubmit={onSubmit}
   validationSchema={addContactValidationSchema}
  >
   {(formik) => (
    <Form>
     <Field name="firstName">
      {({ field, form }: any) => (
       <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
        <FormLabel>First name</FormLabel>
        <Input {...field} id="firstname" isDisabled={isFieldDisabled} />
        <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
       </FormControl>
      )}
     </Field>

     <Field name="lastName">
      {({ field, form }: any) => (
       <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
        <FormLabel>Last name</FormLabel>
        <Input {...field} id="lastname" isDisabled={isFieldDisabled} />
        <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
       </FormControl>
      )}
     </Field>

     <Field name="age">
      {({ field, form }: any) => (
       <FormControl isInvalid={form.errors.age && form.touched.age}>
        <FormLabel>Age</FormLabel>
        <Input {...field} id="age" isDisabled={isFieldDisabled} />
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
      <Button colorScheme="teal" onClick={setIsDisabledInput}>
       Edit
      </Button>
      <Button
       type="submit"
       colorScheme="blue"
       isDisabled={isFieldDisabled}
       isLoading={isLoading}
      >
       Submit
      </Button>
     </Box>
    </Form>
   )}
  </Formik>
 );
};

export default FormUpdateContact;
