import React from "react";

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="details">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <span className="tag">{item.tag}</span>
        <div className="quantity">
          <button onClick={() => onDecrement(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrement(item.id)}>+</button>
        </div>
      </div>
      <div className="price-remove">
        <p>₹{item.price * item.quantity}</p>
        <span onClick={() => onRemove(item.id)}>&#128465;</span>
      </div>
    </div>
  );
};

export default CartItem;
