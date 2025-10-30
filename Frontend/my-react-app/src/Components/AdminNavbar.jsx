import React, { useState } from "react";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log("I am clicked");
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");

    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}

      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left: Logo */}

          <a
            className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4"
            href="/"
            style={{ color: "#f97316" }}
          >
            <span role="img" aria-label="canteen">
              🍽
            </span>
            <span>Admin Dashboard</span>
          </a>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">
            {/* Profile Icon */}
            <div
              onClick={toggleSidebar}
              role="button"
              className="d-flex align-items-center gap-1 text-dark text-decoration-none"
            >
              <UserIcon className="h-5 w-5" />
              <span>Admin User</span>
            </div>

            {/* Logout Button */}
            <button
              className="btn btn-link p-0 ms-2 text-dark"
              title="Logout"
              onClick={handleLogout}
            >
              <HiOutlineArrowRightOnRectangle size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Sidebar */}
      <div
        className={`position-fixed top-0 end-0 bg-white shadow h-100 p-4`}
        style={{
          width: "280px",
          zIndex: 1050,
          transition: "transform 0.3s ease-in-out",
          transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Close Icon */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Profile</h5>
          <button
            onClick={toggleSidebar}
            className="btn btn-sm btn-light border-0"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Avatar & Info */}
        <div className="d-flex flex-column align-items-center text-center">
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
              src="/images/OIP.jpeg"
              alt="Admin Avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <h6 className="fw-bold mt-3">Admin User</h6>
          <p className="text-muted small">admin@canteen.com</p>
          <hr />
          <p className="small text-muted">
            You are logged in as Administrator.
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminNavbar;
