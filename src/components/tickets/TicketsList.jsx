import { useEffect, useState } from "react";
import { Table, Button} from "reactstrap";
import { deleteServiceTicket, getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";


export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  
  
  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, [tickets]);
  
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Delete this ticket?");
    if (!isConfirmed) {
      return;
    }

    deleteServiceTicket(id)
      .then(() => {
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id));
      })
      .catch((error) => {
        console.error("Could not delete ticket:", error);
      });
  };
 

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
            </td>
            <td>
              <Button color="danger" id="delete" onClick={() => handleDelete(t.id)}>
                Delete
              </Button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
