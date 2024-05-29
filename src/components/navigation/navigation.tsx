import React from "react";
import { useRouter } from "next/router";
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 Text,
} from "@chakra-ui/react";

interface props {
 items: {
  name: string;
  link: string;
 }[];
}

const Navigation = ({ items }: props) => {
 const router = useRouter();

 return (
  <Breadcrumb>
   {items.map((item: any, index: number) => (
    <BreadcrumbItem
     key={index}
     isCurrentPage={router.asPath.includes(item.name.toLowerCase())}
    >
     <Text
      fontWeight={
       router.asPath.includes(item.name.toLowerCase()) ? "bold" : "none"
      }
     >
      {item.name}
     </Text>
    </BreadcrumbItem>
   ))}
  </Breadcrumb>
 );
};

export default Navigation;
