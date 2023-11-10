import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router";
import { NavBar } from "./NavBar";

export default function ProtectedRoutes() {
  // const user = auth?.currentUser;
  const user = "this is it";

  return user ? (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/" />
  );
}
