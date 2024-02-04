import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { getEmployees } from "../../data/employeeData";
import { getCustomers } from "../../data/customerData";
import { createServiceTicket } from "../../data/serviceTicketsData";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";




const initialState = {
  description: '',
  emergency: false,
  customer: {},
  employee: {},
  id: 0,
  employeeId: 0,
  customerId: 0,
}

export default function CreateTicket() {
  const [formInput, setFormInput] = useState(initialState);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    getEmployees().then(setEmployees);
    getCustomers().then(setCustomers);
  },[]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput}
    createServiceTicket(payload).then(navigate("/tickets"));
   };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control 
            type="text"
            placeholder="Please describe the issue"
            id="description"
            name="description"
            label="description"
            value={formInput.description}
            onChange={handleChange} />
      </Form.Group>
      <Form.Select
            label="customer"
            name="customerId"
            onChange={handleChange}
            value={formInput.customerId}
            required
      >
            <option value="" label="Which customer?" />
            {
            customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
                label={customer.name}
              />
            ))
          }
      </Form.Select>
      <Form.Select
            label="employee"
            name="employeeId"
            onChange={handleChange}
            value={formInput.employeeId}
            required
      >
            <option value="" label="Which Employee?" />
            {
            employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
                label={employee.name}
              />
            ))
          }
      </Form.Select>
      <Form.Check
            className="text-white mb-3"
            type="switch"
            id="emergency"
            name="emergency"
            label="Emergency?"
            checked={formInput.emergency}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                emergency: e.target.checked,
              }));
            }}
          />
          <Button className="addTicketBtn button"  type="submit" >
          Done?
        </Button>
    </Form>
  );
}

CreateTicket.propTypes = {
  ticketObj: PropTypes.shape({
    Id: PropTypes.number,
    CustomerId: PropTypes.number,
    EmployeeId: PropTypes.number,
    Description: PropTypes.string,
    Emergency: PropTypes.bool,
  })
};

CreateTicket.defaultProps = {
  ticketObj: initialState,
}
