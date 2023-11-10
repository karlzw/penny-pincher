import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box className="flex flex-col w-full h-full items-center justify-center">
      <Typography variant="h6">Error 404</Typography>
      <Typography>Page Not Found</Typography>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </Box>
  );
}

export default PageNotFound;
