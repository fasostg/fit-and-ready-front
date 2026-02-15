import type { ReactNode } from "react";
import { Login } from "../../../pages/login/Login";

export function PrivateRoute({ children }: { children: ReactNode }) {

  const token = localStorage.getItem("token");

  return token ? children : <Login />;
}
