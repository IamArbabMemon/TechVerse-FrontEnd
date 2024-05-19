import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from '@mui/material/Link';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button, List, Rating, Tooltip, useMediaQuery} from "@mui/material";
import { mainListItems, secondaryListItems } from "../components/listItems";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { BrowserRouter as Router, Link } from "react-router-dom"; // Import BrowserRouter

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useProductContext } from "../ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../store/AuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Navbar = () => {
  const isSmallerScreen = useMediaQuery("(max-width:500px)");
  const { role } = React.useContext(AuthContext);

  //* logic for apply redux
  const { cartItems } = useSelector((state) => state.productCount);
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const { setAccessToken, setRole } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setAccessToken(null);
    setRole(null);
    // Navigate("/signIn");
    window.location.href = "/signIn";

  };

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          
            <Typography
              component={Link} to="/" 
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                fontSize: isSmallerScreen ? "0.7rem" : "1.5rem",
                marginLeft: "1rem",
                cursor:"pointer",
                textDecoration: 'none',
              }}
            >
              TECH-VERSE
            </Typography>

            <div style={{ display: "flex", gap: "5px" }}>
              {role !== "wholeseller" &&
              <Link className="nav-link" to="/checkout">
                <Button variant="outlined" sx={{ color: "#e8a505" }}>
                  Added Products ({cartItems.length})
                </Button>
              </Link>}
              {isLoggedIn ? (
                <>
                    <Button
                      onClick={logoutHandler}
                      variant="contained"
                      color="error"
                      endIcon={<LogoutIcon />}
                    >
                      Logout
                    </Button>
                </>
              ) : (
                <>
                  <Link to="/signIn">
                    <Button variant="contained" color="success">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained" color="secondary">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {role === "wholeseller"?(
            <List component="nav">
            {secondaryListItems}
            {/* <Divider sx={{ my: 1 }} /> */}
            {/* {secondaryListItems} */}
          </List>
          ):(
            <List component="nav">
            {/* {mainListItems} */}
            {/* <Divider sx={{ my: 1 }} /> */}
            {mainListItems}
          </List>
          )}
          
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default Navbar;
