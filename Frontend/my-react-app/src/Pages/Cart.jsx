import React, { useState } from "react";
import CartItem from "../Components/CartItem";
import "../styles/cart.css";
import { useCart } from "../Context/CartContext";
import OrderSummary from "../Components/OrderSummary";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Cart = () => {
  const { cartItems, increment, decrement, remove } = useCart();

  return (
    <div>
      <Navbar />
      <hr style={{ borderColor: "transparent" }} />

      <div className="cart-container">
        <div className="cart-items">
          <h2>
            Cart Items (
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </h2>

          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={remove}
            />
          ))}
        </div>
        <OrderSummary items={cartItems} />
      </div>
      <hr style={{ borderColor: "transparent" }} />

      <Footer />
    </div>
  );
};

export default Cart;
