import React from "react";
import "../styles/MealCard.css"; // optional styling
import { Link, useNavigate } from "react-router-dom";

const MealCard = ({ image, name, description, price, onAddToCart }) => {
  return (
    <div
      className="d-flex border rounded shadow p-3 mb-4 bg-white align-items-start"
      style={{ maxWidth: "900px", margin: "0 auto" }}
    >
      <div className="me-4" style={{ flex: "0 0 300px" }}>
        <img
          src={image}
          alt={name}
          className="img-fluid rounded"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h4 className="fw-bold">{name}</h4>
        <p className="text-muted">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-success fs-5">₹{price}</span>

          <button
            className="btn btn-warning text-white fw-semibold"
            onClick={() => {
              onAddToCart();
            }}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
