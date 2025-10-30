import React, { useState } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import "../styles/cart.css";
import { useCart } from "../Context/CartContext";

const CartList = () => {
  const { cartItems, increment, decrement, remove } = useCart();

  return (
    
    <div className="cart-container">
      <div className="cart-items">
        <h2>
          Cart Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
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
  );
};

export default CartList;
