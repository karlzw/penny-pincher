import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router";
import { auth } from "../config/Firebase";
import { NavBar } from "./NavBar";

export default function ProtectedRoutes() {
  const user = auth?.currentUser;

  return user ? (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/" />
  );
}
