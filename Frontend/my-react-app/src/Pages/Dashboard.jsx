import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { ShoppingCart, QrCode, Users, BarChart2 } from "lucide-react";

import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // once:true means animation runs once on scroll
    AOS.refresh(); // optional refresh after init
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Conditional routing logic for student
  const handleStudentClick = () => {
    if (user?.role === "STUDENT") {
      navigate("/student-dashboard");
    } else {
      navigate("/login");
    }
  };

  // Conditional routing logic for admin
  const handleAdminClick = () => {
    if (user?.role === "ADMIN") {
      navigate("/admin-dashboard");
    } else {
      navigate("/admin-login");
    }
  };

  const features = [
    {
      title: "Easy Ordering",
      description: "Browse menu, add to cart, and order with just a few clicks",
      icon: <ShoppingCart color="white" size={30} />,
      color: "#ffb703",
    },
    {
      title: "QR Code System",
      description:
        "Secure order validation with unique QR codes for each order",
      icon: <QrCode color="white" size={30} />,
      color: "#fae588",
    },
    {
      title: "User Management",
      description:
        "Separate portals for students, teachers, and administrators",
      icon: <Users color="white" size={30} />,
      color: "#d62828",
    },
    {
      title: "Analytics",
      description: "Real-time insights into orders, revenue, and popular items",
      icon: <BarChart2 color="white" size={30} />,
      color: "#f77f00",
    },
  ];

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link
            className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4"
            to="/"
            style={{ color: "#f97316" }}
          >
            <span role="img" aria-label="canteen">
              🍽
            </span>
            <span>CampusEat</span>
          </Link>

          <div className="d-flex align-items-center gap-3">
            <Link
              to="/login"
              className="btn btn-warning d-flex align-items-center gap-2 text-white shadow-sm"
            >
              Student Login
            </Link>
            <Link
              to="/admin-login"
              className="btn btn-warning d-flex align-items-center gap-2 text-white shadow-sm"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section text-center text-white">
        <div className="container my-5 px-4 px-md-5">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h1 className="fw-bold mb-3 text-dark">
                Smart Canteen Management
              </h1>
              <p className="lead text-muted">
                Streamline your campus dining experience with digital ordering,
                QR code validation, and real-time management.
              </p>
              <div className="mt-4 d-flex gap-3 justify-content-center justify-content-md-start">
                <button
                  onClick={handleStudentClick}
                  className="btn btn-warning text-white px-4"
                >
                  Student Dashboard
                </button>
                <button
                  onClick={handleAdminClick}
                  className="btn btn-outline-warning px-4"
                >
                  Admin Dashboard
                </button>
              </div>
            </div>
            {/* <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="/images/canteen-hero.jpg"
                alt="Canteen Hero"
                className="img-fluid"
                style={{ maxWidth: "400px" }}
              />
            </div> */}
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Why Choose Our System Section */}

      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-5 fw-bold">Why Choose Our System?</h2>
          <div className="row g-4">
            {features.map((feature, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="card h-100 shadow-sm border-0 feature-card">
                  <div className="card-body text-center bg-white rounded">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                      style={{
                        width: 70,
                        height: 70,
                        backgroundColor: feature.color,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold mt-2">{feature.title}</h5>
                    <p className="text-muted small">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h3 className="fw-bold mb-4">Live Stats</h3>
          <div className="row">
            <div className="col-md-3">
              <h2 className="text-warning fw-bold">1,245+</h2>
              <p className="text-muted">Total Orders</p>
            </div>
            <div className="col-md-3">
              <h2 className="text-warning fw-bold">450+</h2>
              <p className="text-muted">Students Served</p>
            </div>
            <div className="col-md-3">
              <h2 className="text-warning fw-bold">20+</h2>
              <p className="text-muted">Food Items</p>
            </div>
            <div className="col-md-3">
              <h2 className="text-warning fw-bold">12</h2>
              <p className="text-muted">Vendors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-5 fw-bold">What Users Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card p-3 h-100 shadow-sm">
                <p>
                  "Fast and easy to use! Ordering lunch is now hassle-free."
                </p>
                <strong>- Aakash, Student</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 h-100 shadow-sm">
                <p>"I love tracking orders with real-time updates!"</p>
                <strong>- Priya, Teacher</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 h-100 shadow-sm">
                <p>"Best thing to happen to our canteen!"</p>
                <strong>- Raj, Admin</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(to right, #f97316, #fb923c)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <div className="container">
          <h2 className="fw-bold mb-4">Hungry? Let’s Make It Quick & Easy!</h2>
          <p className="lead mb-4">
            Use our smart system to browse the menu, place orders, and track
            everything—right from your device.
          </p>
          <Link
            to="/student-todaysSpecial"
            className="btn"
            style={{
              background: "linear-gradient(to right, #fbbf24, #f97316)",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
              padding: "12px 24px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            Check Today’s Specials
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
