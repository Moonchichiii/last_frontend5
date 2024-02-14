import axios from "axios";

// base entry point
const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// Authentication requests. 
export const axiosJson = axios.create({
  ...axiosBase.defaults,
  headers: { "Content-Type": "application/json" },
});

// Multipart/form-data posts & profile,  
export const axiosFormData = axios.create({
  ...axiosBase.defaults,
  headers: { "Content-Type": "multipart/form-data" },
});


