import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../Services/orderService";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(userId);
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Your Orders</h3>
        <Button variant="secondary" onClick={() => navigate("/student-dashboard")}>
          Back
        </Button>
      </div>

      {orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Token No</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Created On</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.tokenNo}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>{order.paymentStatus ?? "N/A"}</td>
                <td>{new Date(order.createdOn).toLocaleString()}</td>
                <td>
                  {order.items && order.items.length > 0
                    ? order.items.map(item => `${item.itemName} (x${item.quantity})`).join(", ")
                    : "No items"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserOrders;
