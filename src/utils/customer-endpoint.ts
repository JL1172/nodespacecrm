import axios from "axios";
import { CUSTOMER_URLS } from "./customer-urls";

export const viewCustomers = (token: string) => {
  return axios
    .create({ headers: { Authorization: token } })
    .get(CUSTOMER_URLS.viewCustomers);
};
