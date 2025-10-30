import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#2d221b", color: "white", padding: "40px 0" }}
    >
      <div className="container text-center">
        <div style={{ marginBottom: "15px" }}>
          <Link
            to="/about-us"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0 15px",
              fontWeight: "500",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0 200px",
              fontWeight: "500",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            Contact Us
          </Link>
          <Link
            to="/faqs"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0 15px",
              fontWeight: "500",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            FAQ's
          </Link>
        </div>
        <hr />
        <h5>
          🍽 <strong>CampusEat</strong>
        </h5>

        <p className="small mb-3">
          © {new Date().getFullYear()} Canteen Manager. Making campus dining
          smarter and more efficient.
        </p>

        <div style={{ marginBottom: "15px" }}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
        </div>

        <div>
          <p style={{ fontSize: "0.9rem", margin: 0 }}>
            <strong>Team Members:</strong> Om Bongulwar, Nakul Kait, Piyusha
            Desai, Deviprasad Nallaboyina
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
