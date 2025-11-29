// src/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(6px)", boxShadow: "none", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component={Link} to="/" variant="h6" sx={{ textDecoration: "none", color: "#111827", fontWeight: 700 }}>
          LMS Portal
        </Typography>

        <Box>
          <Button component={Link} to="/courses">Courses</Button>
          <Button component={Link} to="/mycourses">My Courses</Button>
          <Button component={Link} to="/assignments">Assignments</Button>

          {user ? (
            <>
              <Button component={Link} to="/profile">Hi, {user.name?.split(" ")[0]}</Button>
              <Button color="error" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login">Login</Button>
              <Button component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
