"use client";
import {
 Box,
 Button,
 Card,
 CardBody,
 IconButton,
 Image,
 Text,
} from "@chakra-ui/react";
import React from "react";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { ContactsListItem } from "@/data/model/home.model";

interface props {
 data: ContactsListItem;
 onDelete?: () => void;
 isDeleteLoading?: boolean;
 onDetail?: () => void;
}

const ContactCard = ({ data, onDelete, isDeleteLoading, onDetail }: props) => {
 return (
  <Card>
   <CardBody>
    <Box display="flex" alignItems="center" justifyContent="space-between">
     <Box display="flex" alignItems="center" gap={5}>
      <Image
       w={30}
       h={30}
       objectFit="cover"
       borderRadius="full"
       src={data?.photo}
       fallbackSrc="https://svgshare.com/i/4V0.svg"
       alt="photo"
      />
      <Box>
       <Text fontWeight="semibold">{`${data?.firstName ?? "-"} ${
        data?.lastName ?? ""
       }`}</Text>
       <Text>{`${data?.age ?? "-"} y.o`}</Text>
      </Box>
     </Box>
     <Box display="flex" gap={4}>
      <IconButton
       onClick={onDelete}
       colorScheme="red"
       aria-label="Delete contact"
       size="md"
       isLoading={isDeleteLoading}
       icon={<DeleteIcon />}
      />
      <Button
       onClick={onDetail}
       colorScheme="blue"
       aria-label="Delete contact"
       size="md"
       leftIcon={<ViewIcon />}
      >
       Detail
      </Button>
     </Box>
    </Box>
   </CardBody>
  </Card>
 );
};

export default ContactCard;
