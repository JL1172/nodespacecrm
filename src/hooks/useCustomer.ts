import { useState } from "react";
import { viewCustomers } from "../utils/customer-endpoint";

export type Message = {
  message_subject: string;
  message_text: string;
  message_sender_id: number;
  message_recipient_id: number;
  created_at: Date;
};
export type CustomerTodo = {
  customer_id: number;
  completed: boolean;
  todo_description: string;
  todo_title: string;
  deadline_date: Date;
  created_at: Date;
  updated_at: Date;
};
export type CustomerState = {
  full_name: string;
  address: string;
  phoneNumber: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  messages: Message[];
  todo: CustomerTodo[];
  tokenError: string;
};
export const useCustomer = (
  state: CustomerState
): [CustomerState, typeof fetchCustomers] => {
  const [data, setData] = useState(state);
  const fetchCustomers = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const res = await viewCustomers(token + "");
      console.log(res);
      //eslint-disable-next-line
    } catch (err: any) {
      console.log(err);
    }
  };
  return [data, fetchCustomers];
};
