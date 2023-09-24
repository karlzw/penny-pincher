import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { Router } from "./config/Router";
import { Theme } from "./config/Theme";

export default function App() {
  const { theme } = Theme();

  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}
