import { CssBaseline, ThemeProvider } from "@mui/material";
import ToggleTheme from "./components/ToggleTheme";
import { Router } from "./config/Router";
import { Theme } from "./config/Theme";

export default function App() {
  const { theme, changeColorMode } = Theme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToggleTheme theme={theme} changeColorMode={changeColorMode} />
      <Router />
    </ThemeProvider>
  );
}
