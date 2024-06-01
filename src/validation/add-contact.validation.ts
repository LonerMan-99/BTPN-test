import * as Yup from "yup";

export const addContactValidationSchema = Yup.object().shape({
 firstName: Yup.string()
  .required("FirstName is required")
  .min(1, "FirstName must be at least 1 characters")
  .max(10, "FirstName must be at most 10 characters"),
 lastName: Yup.string()
  .required("LastName is required")
  .min(1, "LastName must be at least 1 characters")
  .max(10, "LastName must be at most 10 characters"),
 age: Yup.number().required("Age is required"),
});
