import { CssBaseline, ThemeProvider } from "@mui/material";
import { Router } from "./config/Router";
import { Theme } from "./config/Theme";

export default function App() {
  const { theme } = Theme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}
