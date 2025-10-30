// import React from "react";

// const OrderSummary = ({ items }) => {
//   const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
//   const serviceFee = 10;
//   const total = subtotal + serviceFee;

//   return (
//     <div className="order-summary">
//       <h2>Order Summary</h2>
//       {items.map((item) => (
//         <p key={item.id}>
//           {item.name} × {item.quantity}{" "}
//           <span>₹{item.price * item.quantity}</span>
//         </p>
//       ))}
//       <hr />
//       <p>
//         Subtotal <span>₹{subtotal}</span>
//       </p>
//       <p>
//         Service Fee <span>₹{serviceFee}</span>
//       </p>
//       <hr />
//       <h3>
//         Total
//         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
//         <span>₹{total}</span>
//       </h3>
//       <button className="pay-btn">Proceed to Payment</button>
//     </div>
//   );
// };

// export default OrderSummary;


import React from "react";
import { useNavigate } from "react-router-dom";
import { placeOrderAPI } from "../Services/orderService";

const OrderSummary = ({ items }) => {
  const navigate = useNavigate();

  // ✅ Fetch userId from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const serviceFee = 10;
  const total = subtotal + serviceFee;

  const handleProceedToPayment = async () => {
    try {
      const orderPayload = {
        userId,
        totalAmount: total,
        status: "pending",
        paymentStatus: "pending",
        items: items.map(({ id, name, quantity, price }) => ({
          itemId: id,
          itemName: name,
          quantity,
          unitPrice: price,
        })),
      };

      const response = await placeOrderAPI(orderPayload);
      navigate("/proceed-to-payment", { state: { order: response.data } });
    } catch (error) {
      console.error("Failed to place order", error);
      alert("Failed to place order, please try again.");
    }
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {items.map((item) => (
        <p key={item.id}>
          {item.name} × {item.quantity} <span>₹{item.price * item.quantity}</span>
        </p>
      ))}
      <hr />
      <p>
        Subtotal <span>₹{subtotal}</span>
      </p>
      <p>
        Service Fee <span>₹{serviceFee}</span>
      </p>
      <hr />
      <h3>
        Total <span>₹{total}</span>
      </h3>
      <button className="pay-btn" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderSummary;
