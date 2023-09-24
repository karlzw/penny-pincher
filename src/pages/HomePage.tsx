import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { auth } from "../config/Firebase";

export function HomePage() {
  const navigate = useNavigate();
  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <Box>
      <Button onClick={signOut}>Sign Out</Button>
    </Box>
  );
}
