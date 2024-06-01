import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDetailRepository } from "@/data/repository/detail.repository";
import { useDisclosure } from "@chakra-ui/react";
import { UpdateContactRequest } from "@/data/model/detail.model";
import { ContactRequest } from "@/data/model/home.model";

const useDetailHook = () => {
 const [isDisabledInput, setIsDisabledInput] = useState(true);
 const router = useRouter();
 const contactId = router.query.contactId;

 const { getDetailContact, putUpdateExistingContact } = useDetailRepository();
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

 const onSubmit = (values: ContactRequest) => {
  const updatedData = {
   ...data,
   ...(values.firstName && { firstName: values.firstName }),
   ...(values.lastName && { lastName: values.lastName }),
   ...(values.age && { age: values.age }),
  };
  mutationUpdateExistingContact.mutate(updatedData);
 };

 return {
  data,
  isFetching,
  isVisible,
  mutationUpdateExistingContact,
  isDisabledInput,
  setIsDisabledInput,
  onSubmit,
 };
};

export default useDetailHook;
