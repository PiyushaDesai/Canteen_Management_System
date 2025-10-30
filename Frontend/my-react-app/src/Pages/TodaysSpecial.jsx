import React from "react";
import Navbar from "../Components/Navbar";
import FoodCard from "../Components/FoodCard";

// All menu items
const menuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    description:
      "Aromatic basmati rice with tender chicken pieces, cooked with traditional spices",
    price: 180,
    imageUrl: "/images/chicken-biryani.jpg",
    isSpecial: true,
  },
  {
    id: 2,
    name: "Masala Chai",
    description: "Traditional Indian tea with aromatic spices",
    price: 15,
    imageUrl: "/images/Masala-Chai-.jpg",
    isSpecial: true,
  },
  {
    id: 3,
    name: "Pav Bhaji",
    description: "Spiced vegetable curry served with buttered bread rolls",
    price: 80,
    imageUrl: "/images/pavbhaji.jpg",
    isSpecial: true,
  },
  {
    id: 4,
    name: "Samosa",
    description: "Crispy and spicy potato-filled deep fried snack",
    price: 20,
    imageUrl: "/images/samosa.jpg",
    isSpecial: false,
  },
  {
    id: 5,
    name: "Idli Sambar",
    description: "Steamed rice cakes served with sambar and chutney",
    price: 40,
    imageUrl: "/images/idli-sambar.jpg",
    isSpecial: false,
  },
];

function TodaysSpecial() {
  const specialItems = menuItems.filter((item) => item.isSpecial);

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <div className="container py-5">
        <h3 className="h3 fw-semibold mb-4 d-flex align-items-center">
          <span className="me-2" role="img" aria-label="star">
            🌟
          </span>{" "}
          Today's Specials
        </h3>

        <div className="row g-4">
          {specialItems.map((item) => (
            <div className="col-12 col-md-4" key={item.id}>
              <FoodCard
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
                isSpecial={item.isSpecial}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodaysSpecial;
