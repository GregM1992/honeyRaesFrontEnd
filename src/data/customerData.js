const customerUrl = "/api/customer";

export const getCustomers = () => {
  return fetch(customerUrl).then((r) => r.json());
};

export const getCustomerById = (customerId) => {
return fetch(`${customerUrl}/${customerId}`).then((r) => r.json());
};
