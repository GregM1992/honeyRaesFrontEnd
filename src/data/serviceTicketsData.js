const serviceTicketsUrl = "/api/servicetickets";

export const getServiceTickets = () => {
  return fetch(serviceTicketsUrl).then((r) => r.json());
};

export const getServiceTicketsById = (ticketId) => {
  return fetch(`${serviceTicketsUrl}/${ticketId}`).then((r) => r.json());
};
 
export const createServiceTicket = (payload) => new Promise((resolve, reject) => {
  fetch(serviceTicketsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

export const deleteServiceTicket = (id) => new Promise((resolve, reject) => {
  fetch(`${serviceTicketsUrl}/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => resolve(data))
  .catch(reject);
});


export const completeTicket = (id) => new Promise ((resolve, reject) => {
fetch(`${serviceTicketsUrl}/${id}/complete`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    resolve(data);
  })
  .catch(reject);
});
