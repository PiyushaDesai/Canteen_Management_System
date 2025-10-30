import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const { cartCount } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
          <a
            className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4"
            href="/"
            style={{ color: "#f97316" }}
          >
            <span role="img" aria-label="canteen">
              🍽️
            </span>
            <span>CampusEat</span>
          </a>

          {/* Right Controls */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/cart">
              <div className="relative inline-block">
                <button className="bg-yellow-400 text-white px-4 py-2 rounded-md flex items-center gap-2">
                  <FaShoppingCart className="text-white text-lg" />
                  <span className="text-white">Cart</span>
                </button>

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Only show user info if logged in */}
            {user && (
              <>
                <button
                  onClick={() => setShowSidebar(true)}
                  className="btn btn-outline-yellow d-flex align-items-center gap-1"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>{user.fullName}</span>
                </button>

                <button
                  className="btn btn-link p-0 ms-2 text-dark"
                  title="Logout"
                  onClick={handleLogout}
                >
                  <HiOutlineArrowRightOnRectangle size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {showSidebar && user && (
        <div
          className="position-fixed top-0 end-0 bg-white text-dark p-4 shadow-lg"
          style={{
            width: "300px",
            height: "100vh",
            zIndex: 1050,
            transition: "right 0.3s ease-in-out",
          }}
        >
          {/* Close Button */}
          <button
            className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
            onClick={() => setShowSidebar(false)}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          {/* Profile Content */}
          <div className="d-flex flex-column align-items-center text-center mt-4">
            {user.avatar && (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <h5 className="fw-bold mt-3">{user.fullName}</h5>
            <p className="mb-1">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="small">{user.email}</p>
            <Link to="/my-orders" className="text-decoration-none fw-bold mb-3">
              My Orders
            </Link>
            <hr />

            <button className="btn btn-dark w-100 mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
