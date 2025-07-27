import React, { useContext} from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let { token } = useContext(UserContext);

  if (token != null) {
    return children;
  } else {
    return <Navigate to="/signin" />;
  }
}