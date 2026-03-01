import type { ReactNode } from "react";
import { Login } from "../../../pages/login/Login";
import { jwtDecode } from "jwt-decode";

export function PrivateRoute({ children }: { children: ReactNode }) {

  const token = localStorage.getItem("token");

  if (!token) return <Login />;

  if (isTokenExpirado(token)) {
    localStorage.removeItem("token")
    return <Login />;
  }
  

  return children;
}

function isTokenExpirado(token: string) {
  const decoded = jwtDecode(token);
  const expirationTime = decoded?.exp || 0;
  const currentTime = Date.now() / 1000;

  return expirationTime < currentTime
}

