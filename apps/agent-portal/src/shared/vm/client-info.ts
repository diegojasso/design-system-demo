import type { ClientInfoFormValues } from "@/app/quote-context";

export const EMPTY_CLIENT_INFO_FORM_VALUES: ClientInfoFormValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(1990, 0, 1),
  driversLicense: "",
  driversLicenseState: undefined,
  email: "",
  phone: "",
  address: "",
};

