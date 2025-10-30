import React, { useEffect, useState } from "react";
import {
  Edit,
  Trash,
  Plus,
  User,
  ShoppingBag,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "../Components/AdminNavbar";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

import UsersPage from "../Components/UsersComponent";

import {
  fetchTotalOrders,
  fetchTotalRevenue,
  fetchTotalUsers,
} from "../Services/adminDashboard";

import "react-toastify/dist/ReactToastify.css";
import MenuPage from "../Components/MenuComponent";
import OrderPage from "../Components/OrderComponent";
import FeedbackPage from "../Components/Feedback";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [activeTab, setActiveTab] = useState("Menu");
  const [totalRevenue, setTotalRevenue] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();

    fetchOrders();
    fetchRevenue();
  }, []);

  const fetchUsers = async () => {
    const count = await fetchTotalUsers();
    setUserCount(count);
  };

  const fetchOrders = async () => {
    const count = await fetchTotalOrders();
    setOrderCount(count);
  };

  const fetchRevenue = async () => {
    const revenue = await fetchTotalRevenue();
    setTotalRevenue(revenue);
  };

  const stats = [
    { label: "Total Users", value: userCount, icon: <User />, color: "orange" },
    {
      label: "Total Orders",
      value: orderCount,
      icon: <ShoppingBag />,
      color: "orange",
    },
    {
      label: "Total Revenue",
      value: totalRevenue,
      icon: <CurrencyRupeeRoundedIcon className="text-orange-500" />,
      color: "red",
    },
  ];

  return (
    <div className="bg-light min-vh-100">
      <AdminNavbar />
      <br className="my-3" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
          >
            <div
              className={`p-2 rounded-full ${
                item.color === "orange"
                  ? "bg-orange-100 text-orange-600"
                  : item.color === "red"
                  ? "bg-red-100 text-red-600"
                  : item.color === "yellow"
                  ? "bg-yellow-100 text-yellow-600"
                  : ""
              }`}
            >
              {item.icon}
            </div>
            <div>
              <div className="text-gray-500 text-sm">{item.label}</div>
              <div className="text-xl font-bold text-orange-600">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border rounded-xl mb-6 overflow-hidden text-sm text-gray-600">
        {["Orders", "Menu", "Users", "Feedback"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-center ${
              activeTab === tab
                ? "bg-white font-semibold border-x"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Users" && <UsersPage onUserDeleted={fetchUsers} />}
      {activeTab === "Menu" && <MenuPage />}
      {activeTab === "Orders" && <OrderPage />}
      {activeTab === "Feedback" && <FeedbackPage />}

      <hr className="my-3" />
      <Footer />
    </div>
  );
}

export default AdminDashboard;
