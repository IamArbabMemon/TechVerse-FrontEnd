import { Box, Toolbar } from "@mui/material";
import React, { Fragment } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const drawerWidth = 100;
  return (
    <Fragment>
      <Box display="flex" sx={{ minHeight: "100vh" }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2.5,
            ml: 1,
            my: 1.5,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {/* {children} */}
          <Outlet />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Layout;
