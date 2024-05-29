import { ContactRequest } from "@/data/model/home.model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HomeState {
 dataListContacts: any;
 isPopupOpen: boolean;
 addFormData: ContactRequest;
}

const initialState: HomeState = {
 dataListContacts: [],
 isPopupOpen: false,
 addFormData: {
  age: "",
  photo: "",
  firstName: "",
  lastName: "",
 },
};

export const homeSlice = createSlice({
 name: "homeSlicer",
 initialState,
 reducers: {
  openPopupAddContact: (state: any) => {
   state.isPopupOpen = true;
  },
  closePopupAddContact: (state: any) => {
   state.isPopupOpen = false;
  },

  setContacts: (state: any, action: PayloadAction<any>) => {
   state.dataListContacts = action.payload;
  },

  saveFormAddContact: (state: any, action: PayloadAction<ContactRequest>) => {
   state.addFormData = action.payload;
  },
 },
});

// Action creators are generated for each case reducer function
export const {
 openPopupAddContact,
 closePopupAddContact,
 setContacts,
 saveFormAddContact,
} = homeSlice.actions;

export default homeSlice.reducer;
