import { Box, styled } from "@mui/material";
import { useState } from "react";
import darkModeImage from "../assets/darkMode.jpg";
import lightModeImage from "../assets/lightMode.jpg";
import ToggleTheme from "../components/ToggleTheme";
import { SignInForm } from "../forms/SignInForm";
import { SignUpForm } from "../forms/SignUpForm";

const DarkModeBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "50%",
  [theme.breakpoints.up("md")]: {
    width: "25rem",
  },

  position: "relative",
  backgroundImage: `url(${
    theme.palette.mode === "light" ? lightModeImage : darkModeImage
  })`,

  transitionDuration: "1s",
  display: "flex",
  justifyContent: "end",
  padding: "0.5rem",
}));

export const LandingPage = () => {
  const [isSignInFormActive, setIsSignInFormActive] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: "1rem",
      }}
    >
      <DarkModeBox>
        <ToggleTheme />
      </DarkModeBox>
      {isSignInFormActive ? (
        <SignInForm setIsSignInFormActive={setIsSignInFormActive} />
      ) : (
        <SignUpForm setIsSignInFormActive={setIsSignInFormActive} />
      )}
    </Box>
  );
};
