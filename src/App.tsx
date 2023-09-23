import { ThemeProvider } from "@emotion/react";
import { LightMode, DarkMode } from "@mui/icons-material";
import {
  Box,
  Button,
  styled,
  Typography,
  CssBaseline,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useThemeMode } from "./customhooks/useThemeMode";

const CustomButton = styled(Button)`
  background: ${red[400]};
  color: white;

  &:hover {
    /* color: ${red[500]}; */
    background: ${red[600]};
  }
`;

export default function App() {
  const { theme, changeColorMode } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box>
        <Typography>Hello Carlos</Typography>
        <CustomButton>This is a button</CustomButton>

        {theme.palette.mode === "dark" ? (
          <LightMode onClick={changeColorMode} sx={{ cursor: "pointer" }} />
        ) : (
          <DarkMode onClick={changeColorMode} sx={{ cursor: "pointer" }} />
        )}
      </Box>
    </ThemeProvider>
  );
}
