import axios from "axios";

//const BASE_URL = "http://localhost:8085/payments";
const BASE_URL="https://order-service-yjpu.onrender.com/payments"

export const createPaymentOrder = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating payment order:", error);
    throw error; // rethrow so caller knows
  }
};

export const updatePaymentStatus = async (paymentId, status) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify`, null, {
      params: { paymentId, status }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

