import useHttpClient from "@/services/http-client";
import { AxiosInstance } from "axios";
import {
 ContactRequest,
 BaseResponse,
 ContactsListItem,
} from "../model/home.model";
import { generateRandomString } from "@/services/generate-string";

interface useHomeRepository {
 getListAllContacts(): Promise<BaseResponse<ContactsListItem>>;
 deleteContact(id: string): Promise<any>;
 postAddNewContact(addContactRequest: ContactRequest): Promise<any>;
}

async function getListAllContacts(
 httpClient: AxiosInstance
): Promise<BaseResponse<ContactsListItem>> {
 try {
  const response = await httpClient.get(
   "https://contact.herokuapp.com/contact"
  );

  const responseData: BaseResponse<ContactsListItem> = response.data;
  return responseData;
 } catch (error) {
  throw error;
 }
}

async function postAddNewContact(
 addContactRequest: ContactRequest,
 httpClient: AxiosInstance
): Promise<any> {
 const request = {
  firstName: addContactRequest.firstName.replace(/\s/g, ""),
  lastName: addContactRequest.lastName.replace(/\s/g, ""),
  age: Number(addContactRequest.age),
  photo: `https://robohash.org/${generateRandomString()}`,
 };
 try {
  const response = await httpClient.post(
   `https://contact.herokuapp.com/contact`,
   request
  );

  return response.data;
 } catch (error) {
  throw error;
 }
}

async function deleteContact(
 id: string,
 httpClient: AxiosInstance
): Promise<any> {
 try {
  const response = await httpClient.delete(
   `https://contact.herokuapp.com/contact/${id}`
  );
  return response;
 } catch (error) {
  throw error;
 }
}

export function useHomeRepository(): useHomeRepository {
 const { httpClient } = useHttpClient();
 return {
  getListAllContacts: async () => {
   return getListAllContacts(httpClient);
  },
  postAddNewContact: async (addContactRequest: ContactRequest) => {
   return postAddNewContact(addContactRequest, httpClient);
  },
  deleteContact: async (id: string) => {
   return deleteContact(id, httpClient);
  },
 };
}
