import useHttpClient from "@/services/http-client";
import { AxiosInstance } from "axios";
import { ContactsListItem } from "../model/home.model";
import { UpdateContactRequest } from "../model/detail.model";

interface useDetailRepository {
 getDetailContact(contactId: any): Promise<ContactsListItem>;
 putUpdateExistingContact(
  contactId: any,
  updateContactRequest: UpdateContactRequest
 ): Promise<any>;
}

async function getDetailContact(
 contactId: string,
 httpClient: AxiosInstance
): Promise<ContactsListItem> {
 try {
  const response = await httpClient.get(
   `https://contact.herokuapp.com/contact/${contactId}`
  );

  const responseData: ContactsListItem = response.data.data;
  return responseData;
 } catch (error) {
  throw error;
 }
}

async function putUpdateExistingContact(
 contactId: string,
 updateContactRequest: UpdateContactRequest,
 httpClient: AxiosInstance
): Promise<any> {
 const request = {
  firstName: updateContactRequest.firstName,
  lastName: updateContactRequest.lastName,
  age: Number(updateContactRequest.age),
  photo: updateContactRequest.photo,
 };
 try {
  const response = await httpClient.put(
   `https://contact.herokuapp.com/contact/${contactId}`,
   request
  );

  return response.data;
 } catch (error) {
  throw error;
 }
}

export function useDetailRepository(): useDetailRepository {
 const { httpClient } = useHttpClient();
 return {
  getDetailContact: async (contactId: string) => {
   return getDetailContact(contactId, httpClient);
  },
  putUpdateExistingContact: async (
   contactId: string,
   updateContactRequest: UpdateContactRequest
  ) => {
   return putUpdateExistingContact(contactId, updateContactRequest, httpClient);
  },
 };
}
