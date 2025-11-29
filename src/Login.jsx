// src/Login.jsx
import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "./auth.css";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res.success) {
      toast.success("Logged in");
      nav("/courses");
    } else toast.error(res.message || "Login failed");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper className="auth-card" sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        <form onSubmit={submit}>
          <TextField label="Email" fullWidth required margin="normal" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <TextField label="Password" fullWidth required margin="normal" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#EF4444" }}>Login</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
