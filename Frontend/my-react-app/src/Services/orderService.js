import axios from "axios"

//const BASE_URL = "http://localhost:8085/orders";
const BASE_URL=  "https://order-service-yjpu.onrender.com/orders"
export const placeOrderAPI=(orderPayload)=>{
    return axios.post(`${BASE_URL}/add`,orderPayload)
}

export const getUserOrders = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};