import React from "react";

import axios from "axios";

const NewAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://kape-shop.app"
      : "http://127.0.0.1:8000",
  withCredentials: true,
});
NewAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token != "" && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default NewAxios;
