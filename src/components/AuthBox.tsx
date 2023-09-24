import { Box, lighten, styled } from "@mui/material";

export const AuthBox = styled(Box)(({ theme }) => ({
  display: "flex",
  boxSizing: "border-box",
  width: "7rem",
  height: "2.5rem",
  alignItems: "center",
  gap: "0.4rem",
  background: `${theme.palette.primary.main}`,
  paddingRight: "1rem",
  borderRadius: "0.25rem",
  color: `${theme.palette.mode === "dark" ? "#121212" : "white"}`,
  cursor: "pointer",
  border: `0.25rem solid ${theme.palette.primary.main}`,
  transitionDuration: "400ms",

  "&:hover": {
    background: "none",
    color: lighten(`${theme.palette.primary.main}`, 0.25),
    border: `0.15rem solid ${theme.palette.primary.main}`,
  },

  ".MuiTypography-root": {
    fontWeight: 500,
    fontSize: "1.2rem",
    paddingLeft: "0.1rem",

    "&:hover": {
      fontWeight: 600,
    },
  },

  "& img": {
    width: "2rem",
    background: `${theme.palette.mode === "dark" ? "#121212" : "white"}`,
    padding: "0.25rem",
    borderRadius: "0.25rem",
  },
}));
