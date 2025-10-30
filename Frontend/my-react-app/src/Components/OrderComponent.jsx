import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../Services/adminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders(); // Refresh after update
    } catch (error) {
      console.error(`Error updating order ${orderId}`, error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Orders</h3>
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light text-center">
          <tr>
            <th>Token No</th>
            <th>User ID</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Created On</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.tokenNo}</td>
              <td>{order.userId}</td>
              <td className="text-start">
                {order.items.map((item, index) => (
                  <div key={index}>
                    {item.itemName} (x{item.quantity})
                  </div>
                ))}
              </td>
              <td>₹{order.totalAmount}</td>
              <td>
                <span
                  className={`badge ${
                    order.status === "completed"
                      ? "bg-success"
                      : order.status === "ready"
                      ? "bg-primary"
                      : order.status === "preparing"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td>{order.paymentStatus || "N/A"}</td>
              <td>{new Date(order.createdOn).toLocaleString()}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
