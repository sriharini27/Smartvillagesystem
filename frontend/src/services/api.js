import axios from "axios";

const API = axios.create({
  baseURL: "https://smartvillagesystem.onrender.com"
});

export const getComplaints = () => API.get("/complaints");

export const addComplaint = (data) =>
  API.post("/complaints", data);

export const updateStatus = (id, data) =>
  API.put(`/complaints/${id}`, data);

export default API;