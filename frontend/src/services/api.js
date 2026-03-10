import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getComplaints = () => API.get("/complaints");

export const addComplaint = (data) =>
  API.post("/complaints", data);

export const updateStatus = (id, data) =>
  API.put(`/complaints/${id}`, data);

export default API;     