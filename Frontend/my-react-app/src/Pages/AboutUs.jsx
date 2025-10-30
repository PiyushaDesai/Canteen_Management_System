import React from "react";
import { Link } from "react-router-dom";
import { Home, Info, Phone, HelpCircle } from "lucide-react";
import "../styles/AboutUs.css"; // Add slide effect here

const AboutUs = () => {
  return (
    <div
      className="d-flex"
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        className="sidebar d-flex flex-column align-items-center py-4"
        style={{
          width: "60px",
          backgroundColor: "orange",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
      >
        <Link to="/" className="mb-4 text-white" title="Home">
          <Home />
        </Link>
        <Link to="/about-us" className="mb-4 text-white" title="About Us">
          <Info />
        </Link>
        <Link to="/contact-us" className="mb-4 text-white" title="Contact Us">
          <Phone />
        </Link>
        <Link to="/faqs" className="text-white" title="FAQs">
          <HelpCircle />
        </Link>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 bg-light"
        style={{
          marginLeft: "60px",
          width: "calc(100% - 60px)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        }}
      >
        <div
          className="bg-white shadow p-5 rounded w-100 h-100"
          style={{ overflowY: "auto" }}
        >
          <h3 className="text-center fw-bold mb-4" style={{ color: "#FFD700" }}>
            About Our Canteen 🏫
          </h3>

          <p className="text-muted fs-5">
            Welcome to the <strong>Canteen Management System</strong>! Our goal
            is to provide a seamless digital platform for managing food services
            within campuses or corporate spaces.
          </p>

          <h5 className="mt-4 text-success">📋 What We Offer</h5>
          <ul className="text-muted fs-5">
            <li>Digital food ordering & management</li>
            <li>Real-time menu updates</li>
            <li>Inventory & order tracking</li>
            <li>Special item promotions</li>
          </ul>

          <h5 className="mt-4 text-success">🎯 Our Mission</h5>
          <p className="text-muted fs-5">
            To simplify and enhance the canteen experience for customers and
            staff by leveraging modern technology.
          </p>

          <h5 className="mt-4 text-success">👥 Our Team</h5>
          <ul className="text-muted fs-5">
            <li>Om Bongulwar</li>
            <li>Nakul Kait</li>
            <li>Piyusha Desai</li>
            <li>Deviprasad Nallaboyina</li>
          </ul>

          <p className="text-center text-secondary mt-4 small">
            © {new Date().getFullYear()} Canteen Management System. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
