import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { Theme } from "../config/Theme";
import { setThemeMode } from "../config/appSlice";

const ToggleThemeBox = styled(Box)(({ theme }) => ({
  // position: "absolute",
  // right: theme.spacing(1),
  // top: theme.spacing(1),
}));

export default function ToggleTheme() {
  const { theme } = Theme();
  const dispatch = useDispatch();

  return (
    <ToggleThemeBox
      onClick={() =>
        dispatch(setThemeMode(theme.palette.mode === "dark" ? "light" : "dark"))
      }
      className="cursor-pointer"
    >
      {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
    </ToggleThemeBox>
  );
}
