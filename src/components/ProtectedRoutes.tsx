import { Box, Typography } from "@mui/material";
import { Navigate, Outlet } from "react-router";
import { auth } from "../config/Firebase";

export default function ProtectedRoutes() {
  const user = auth?.currentUser;

  return user ? (
    <Box>
      <Typography variant="h6">Welcome {user?.displayName}</Typography>
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/" />
  );
}
