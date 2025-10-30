import React from "react";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";

const FoodCard = ({
  id,
  name,
  description,
  price,
  imageUrl,
  isSpecial,
  onAddToCart,
}) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({ id, name, price, description, image: imageUrl });
    toast.success("Item Added to cart");
  };
  // If the imageUrl is a relative path (like /images/...), it will work with Vite/public
  const fullImageUrl = imageUrl
    ? imageUrl.startsWith("http") || imageUrl.startsWith("/")
      ? imageUrl
      : `https://${imageUrl}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="card h-100 shadow-sm border-0 rounded-4">
      <img
        src={fullImageUrl}
        alt={name}
        style={{
          display: "block",
          height: "200px",
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
          borderTopLeftRadius: "0.75rem", // match rounded-4
          borderTopRightRadius: "0.75rem",
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
        }}
      />

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0 fw-semibold">{name}</h5>
          {isSpecial && (
            <span className="badge bg-warning text-dark ms-2">Special</span>
          )}
        </div>

        <p
          className="card-text text-secondary mb-3"
          style={{ minHeight: "48px" }}
        >
          {description}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fw-bold" style={{ color: "#f97316" }}>
            ₹{price}
          </span>
          <button
            className="btn btn-warning text-white fw-semibold shadow-sm"
            onClick={handleAddToCart}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
