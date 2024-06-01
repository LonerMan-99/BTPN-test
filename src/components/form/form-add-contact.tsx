import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closePopupAddContact, saveFormAddContact } from "@/slicer/home-slicer";

interface props {
 onSubmit: () => void;
}

const FormAddContact = ({ onSubmit }: props) => {
 const dispatch = useDispatch();

 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  age: "",
 });

 const handleInputChange = (e: any) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
 };

 const handleSubmit = (e: any) => {
  e.preventDefault();
  dispatch(saveFormAddContact(formData));
  onSubmit();
 };

 return (
  <form onSubmit={handleSubmit}>
   <FormControl>
    <FormLabel>First name</FormLabel>
    <Input
     name="firstName"
     placeholder="First name"
     value={formData.firstName}
     onChange={handleInputChange}
    />
    <FormLabel mt={2}>Last name</FormLabel>
    <Input
     name="lastName"
     placeholder="Last name"
     value={formData.lastName}
     onChange={handleInputChange}
    />

    <FormLabel mt={2}>Age</FormLabel>
    <Input
     type="number"
     name="age"
     placeholder="Your age"
     value={formData.age}
     onChange={handleInputChange}
    />
   </FormControl>

   <Box display="flex" alignItems="center" gap={4} mt={6} justifyContent="end">
    <Button variant="ghost" onClick={() => dispatch(closePopupAddContact())}>
     Close
    </Button>
    <Button type="submit" colorScheme="blue">
     Submit
    </Button>
   </Box>
  </form>
 );
};

export default FormAddContact;
