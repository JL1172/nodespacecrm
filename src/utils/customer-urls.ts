import { BASE_URL } from "./base-url";

const CUSTOMER_BASE: string = BASE_URL + "api/customer/";

export type CustomerUrlType = {
    viewCustomers: string;
    updateCustomer:string;
    createCustomerTodo:string;
    updateCustomerTodo:string;
    viewCustomerTodo: string;
    createNewCustomer:string;
    draftMessageToCustomer:string;
    sendMessageToCustomer:string;
}

export const CUSTOMER_URLS:CustomerUrlType = {
    viewCustomers: CUSTOMER_BASE + 'view-customers',
    updateCustomer: CUSTOMER_BASE + 'update-customer-info',
    createCustomerTodo: CUSTOMER_BASE + 'create-customer-todo',
    updateCustomerTodo: CUSTOMER_BASE + 'update-customer-todo',
    viewCustomerTodo: CUSTOMER_BASE + 'view-customer-todo',
    createNewCustomer: CUSTOMER_BASE + 'create-new-customer',
    draftMessageToCustomer: CUSTOMER_BASE + 'draft-message-to-customer',
    sendMessageToCustomer: CUSTOMER_BASE + 'send-customer-message',
} 