import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getEmployees } from "../../data/employeeData";
import { Link } from "react-router-dom";

export default function EmployeesList() {
  const [employee, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employee.map((e) => (
          <tr key={`ticket-${e.id}`}>
            <th scope="row">{e.id}</th>
            <td>{e.name}</td>
            <td>
              <Link to={`${e.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
