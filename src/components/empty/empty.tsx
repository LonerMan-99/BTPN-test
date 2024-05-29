import { WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Empty = () => {
 return (
  <Box
   display="flex"
   flexDirection="column"
   alignItems="center"
   boxShadow="1px 1px 3px gray"
   borderRadius={4}
   padding={30}
  >
   <WarningTwoIcon color="#20A4DC" boxSize="8em" />
   <Text fontWeight="bold" fontSize={12}>
    Contacts are Empty
   </Text>
  </Box>
 );
};

export default Empty;
