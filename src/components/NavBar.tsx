import { DarkMode, LightMode, Logout } from "@mui/icons-material";
import { Link, ListItemIcon, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "../config/Firebase";
import { Theme } from "../config/Theme";
import { setThemeMode } from "../config/appSlice";

const pages = ["Dashboard", "Transactions", "Analytics", "Settings"];

export function NavBar() {
  const { theme } = Theme();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  //   const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  //   };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSignout = () => {
    setAnchorElUser(null);
    auth.signOut();
    navigate("/");
  };

  const handleDeleteAccount = () => {};

  const handleChangeName = () => {};

  const handleChangePassword = () => {};

  const handleThemeMode = () => {
    // setAnchorElUser(null);
    dispatch(setThemeMode(theme.palette.mode === "dark" ? "light" : "dark"));
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense" className="justify-between">
        <Box className="flex items-center">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            className="flex mr-4 no-underline text-inherit font-bold"
          >
            Penny Pincher
          </Typography>
        </Box>

        <Box className="flex gap-4 flex-grow mx-4">
          {pages.map((page) => (
            <Link
              key={page}
              component={RouterLink}
              to={`/${page.toLowerCase()}`}
              underline="none"
              color="white"
            >
              {page}
            </Link>
          ))}
        </Box>

        <Box className="flex gap-1 items-center">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>

          <Menu
            className="mt-12"
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key={3} onClick={handleThemeMode}>
              <ListItemIcon>
                {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
              </ListItemIcon>
              <ListItemText sx={{ textTransform: "capitalize" }}>
                {theme.palette.mode === "dark" ? "light" : "dark"} Mode
              </ListItemText>
            </MenuItem>

            <MenuItem key={2} onClick={handleSignout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
          </Menu>
          <Typography className="ml-1s">
            {auth?.currentUser?.displayName}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
