import React from "react";
import { useEffect, useState } from "react";

export function AuthConfig() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return { token };
}
