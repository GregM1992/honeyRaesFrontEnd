const employeeUrl = "/api/employee";

export const getEmployees = () => {
  return fetch(employeeUrl).then((r) => r.json());
};

export const getEmployeeById = (employeeId) => {
return fetch(`${employeeUrl}/${employeeId}`).then((r) => r.json());
};
