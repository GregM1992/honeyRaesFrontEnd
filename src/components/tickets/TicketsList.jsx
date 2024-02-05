import { useEffect, useState } from "react";
import { Table, Button} from "reactstrap";
import { completeTicket, deleteServiceTicket, getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";


export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  
  
  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, [tickets.isComplete, tickets]);
  
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

  const handleComplete = (id) => {
      const isConfirmed = window.confirm("Complete this ticket?");
      if (!isConfirmed) {
        return;
      }
      completeTicket(id)
      .then(() => {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === id ? { ...ticket, isComplete: true } : ticket
          )
        );
      }).then(console.warn(tickets))
      .catch((error) => {
        console.error("Error completing service ticket:", error);
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
              <Button color="danger" onClick={() => handleDelete(t.id)}>
                Delete
              </Button>{" "}
            </td>
              <td>{!t.isComplete? <Button color="success" onClick={() => handleComplete(t.id)}> Complete </Button> : <p></p>}
              </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
