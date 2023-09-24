import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { HomePage } from "../pages/HomePage";
import { LandingPage } from "../pages/LandingPage";

export function Router() {
  return (
    <Box width="100vw" height="100vh">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route index path="/home" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}
