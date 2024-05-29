"use client";
import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import jeniusLogo from "@/assets/jenius-logo.svg";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface props {
 isShownButton?: boolean;
 buttonHeaderIcon?: React.ReactElement;
 eventButtonHeader?: () => void;
}

const Header = ({
 isShownButton,
 buttonHeaderIcon,
 eventButtonHeader,
}: props) => {
 const router = useRouter();

 return (
  <Box
   bg="#20A4DC"
   w="100%"
   p={4}
   color="white"
   display="flex"
   justifyContent="space-between"
   alignItems="center"
  >
   <Box display="flex" alignItems="center" gap={8}>
    <IconButton
     variant="outline"
     onClick={() => router.back()}
     colorScheme="gray"
     color="white"
     aria-label="Add contact"
     size="sm"
     icon={<ArrowBackIcon />}
    />
    <Image src={jeniusLogo} alt="logo" width={85} />
   </Box>
   {isShownButton && (
    <IconButton
     onClick={eventButtonHeader}
     colorScheme="gray"
     aria-label="Add contact"
     size="md"
     icon={buttonHeaderIcon}
    />
   )}
  </Box>
 );
};

export default Header;
