import { ThemeProvider } from "@emotion/react";
import { LightMode, DarkMode } from "@mui/icons-material";
import { Box, Button, styled, Typography, CssBaseline } from "@mui/material";
import { useTheme } from "./customhooks/useTheme";

const ToggleThemeBox = styled(Box)((props) => {
  console.log(props);

  return {
    position: "absolute",
    right: props.theme.spacing(1),
    top: props.theme.spacing(1),
  };
});

export default function App() {
  const { theme, changeColorMode } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToggleThemeBox>
        {theme.palette.mode === "dark" ? (
          <LightMode onClick={changeColorMode} sx={{ cursor: "pointer" }} />
        ) : (
          <DarkMode onClick={changeColorMode} sx={{ cursor: "pointer" }} />
        )}
      </ToggleThemeBox>
    </ThemeProvider>
  );
}
