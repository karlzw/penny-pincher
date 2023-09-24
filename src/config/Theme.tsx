import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export function Theme() {
  const mode = useSelector((state: RootState) => state.themeMode.mode);

  const theme = createTheme({
    palette: {
      mode,
      // primary: {
      //   main: "#90caf9",
      //   light: "#e3f2fd",
      //   dark: "#42a5f5",
      // },
      // secondary: {
      //   main: "#ce93d8",
      //   light: "#f3e5f5",
      //   dark: "#ab47bc",
      // },
    },
  });

  return { theme };
}
