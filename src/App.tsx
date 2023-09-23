import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import ToggleTheme from "./components/ToggleTheme";
import { useTheme } from "./customhooks/useTheme";

export default function App() {
  const { theme, changeColorMode } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToggleTheme theme={theme} changeColorMode={changeColorMode} />
    </ThemeProvider>
  );
}
