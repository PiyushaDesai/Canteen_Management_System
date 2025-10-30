import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./Context/CartContext";

import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import AdminLogin from "./Pages/AdminLogin";
import StudentDashboard from "./Pages/StudentDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Dashboard from "./Pages/Dashboard";
import AddMenuItem from "./Pages/AddMenuItem";
import VerifyOtp from "./Components/VerifyOtp";
import CartList from "./Components/CartList";
import Feedback from "./Pages/FeedbackPage";
import EditMenuItem from "./Pages/EditMenuItem";
import Cart from "./Pages/Cart";
import ProceedToPayment from "./Pages/ProceedToPayment";

import "./App.css";
import TodaysSpecial from "./Pages/TodaysSpecial";
import PaymentSuccess from "./Pages/PaymentSuccess";
import AboutUs from "./Pages/AboutUs";

import ProtectedRoute from "./Components/ProtectedRoute";

import UserOrders from "./Pages/UserOrders";

function App() {
  return (
    <CartProvider>
      <Router>
        <ToastContainer />
        <Routes>
          {/*  Public Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* Protected Routes */}
          {/* Protected Routes - Student */}
          <Route
            element={<ProtectedRoute allowedRoles={["Student", "Teacher"]} />}
          >
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/student-todaysSpecial" element={<TodaysSpecial />} />
            <Route path="/student/feedback" element={<Feedback />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/proceed-to-payment" element={<ProceedToPayment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/my-orders" element={<UserOrders />} />

            <Route path="/about-us" element={<AboutUs />} />
          </Route>

          {/* Protected Routes - Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-editMenuItem/:id" element={<EditMenuItem />} />
            <Route path="/admin-addMenuItem" element={<AddMenuItem />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
