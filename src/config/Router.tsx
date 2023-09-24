import { Box } from "@mui/material";
import { Route, Routes } from "react-router";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Analytics from "../pages/Analytics";
import { Dashboard } from "../pages/Dashboard";
import { LandingPage } from "../pages/LandingPage";
import PageNotFound from "../pages/PageNotFound";
import Settings from "../pages/Settings";
import Transactions from "../pages/Transactions";

export function Router() {
  return (
    <Box width="100vw" height="100vh">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Box>
  );
}
