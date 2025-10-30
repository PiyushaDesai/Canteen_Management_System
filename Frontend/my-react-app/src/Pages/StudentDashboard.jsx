import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import FoodCard from "../Components/FoodCard";
import MealCard from "../Components/MealCard";
import { getAllMenuItems } from "../Services/menuItemService";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/StudentDashboard.css";
import Footer from "../Components/Footer";

function StudentDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMealCard, setShowMealCard] = useState(false);

  const { addToCart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const categoryOrder = [
    "All",
    "Beverages",
    "Breakfast",
    "Veg",
    "Non-Veg",
    "Desserts",
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getAllMenuItems();
        setMenuItems(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("Something went wrong while loading the menu.");
        toast.error("Failed to load menu items!");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    let matchCategory = false;
    if (selectedCategory === "All") {
      matchCategory = item.category !== "Today's Menu";
    } else if (selectedCategory === "Veg") {
      matchCategory =
        item.itemType === "veg" && item.category !== "Today's Menu";
    } else if (selectedCategory === "Non-Veg") {
      matchCategory =
        item.itemType === "nonveg" && item.category !== "Today's Menu";
    } else if (selectedCategory === "VegMeal") {
      matchCategory =
        item.category === "Today's Menu" && item.itemType === "veg";
    } else if (selectedCategory === "NonVegMeal") {
      matchCategory =
        item.category === "Today's Menu" && item.itemType === "nonveg";
    } else {
      matchCategory = item.category === selectedCategory;
    }
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <div className="container py-5">
        <h2 className="display-5 fw-bold text-dark mb-2">
          Welcome back,{" "}
          <span className="text-warning">{user?.fullName || "Guest"}</span>! 👋
        </h2>
        <p className="text-secondary fs-5">
          Ready to order some delicious food today?
        </p>
      </div>

      <hr />

      <div className="container pb-3">
        <h3 className="h3 fw-semibold mb-4 d-flex align-items-center">
          🌟 Today's Menu
        </h3>

        <div className="row mb-4 text-center">
          <div className="col-6">
            <div
              className={`meal-option-card ${
                selectedCategory === "VegMeal" ? "selected-meal veg" : "veg"
              }`}
              onClick={() => {
                setSelectedCategory("VegMeal");
                setShowMealCard(true);
              }}
            >
              <h5
                className={`fw-bold ${
                  selectedCategory === "VegMeal" ? "active-text" : ""
                }`}
              >
                🥗 Veg Meal
              </h5>
              <p className="text-muted small mb-0">
                A wholesome vegetarian combo
              </p>
            </div>
          </div>
          <div className="col-6">
            <div
              className={`meal-option-card ${
                selectedCategory === "NonVegMeal"
                  ? "selected-meal nonveg"
                  : "nonveg"
              }`}
              onClick={() => {
                setSelectedCategory("NonVegMeal");
                setShowMealCard(true);
              }}
            >
              <h5
                className={`fw-bold ${
                  selectedCategory === "NonVegMeal" ? "active-text" : ""
                }`}
              >
                🍗 Non-Veg Meal
              </h5>
              <p className="text-muted small mb-0">
                Protein-rich non-veg combo
              </p>
            </div>
          </div>
        </div>

        {selectedCategory !== "VegMeal" &&
          selectedCategory !== "NonVegMeal" && (
            <>
              <div className="d-flex justify-content-center mb-4">
                <div
                  className="d-flex rounded-pill border overflow-hidden"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  {categoryOrder.map((category, index) => (
                    <button
                      key={index}
                      className={`btn px-4 py-2 ${
                        selectedCategory === category
                          ? "bg-white fw-semibold border"
                          : "bg-transparent text-secondary"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                      style={{
                        borderRadius: 0,
                        borderRight: "1px solid #dee2e6",
                        borderColor:
                          selectedCategory === category
                            ? "#dee2e6"
                            : "transparent",
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 text-center">
                <input
                  type="text"
                  placeholder="Search food..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control w-50 mx-auto"
                />
              </div>
            </>
          )}
        {loading ? (
          <p className="text-center text-muted">Loading menu...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-muted text-center">
            No items found for this filter.
          </p>
        ) : selectedCategory === "VegMeal" ||
          selectedCategory === "NonVegMeal" ? (
          <div>
            {filteredItems.map((item) => (
              <MealCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.imageUrl}
                onAddToCart={() => {
                  addToCart({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.imageUrl,
                    tag: item.isSpecial ? "Special" : "",
                  });
                  setShowMealCard(false);
                  setSelectedCategory("All");
                }}
              />
            ))}
          </div>
        ) : (
          <div className="row g-4">
            {filteredItems.map((item) => (
              <div className="col-12 col-md-4" key={item.id}>
                <FoodCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  isSpecial={item.isSpecial}
                  onAddToCart={() => {
                    addToCart({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      image: item.imageUrl,
                      tag: item.isSpecial ? "Special" : "",
                    });
                    toast.success(`${item.name} added to cart!`);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="container mt-5 mb-5 text-center feedback-section">
          <h4 className="mb-3">Got Feedback?</h4>
          <p className="text-muted mb-4">
            Let us know how we can improve your experience!
          </p>
          <Link to="/student/feedback" className="btn btn-warning px-4 py-2">
            Give Feedback
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
