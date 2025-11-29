// src/Register.jsx
import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "./auth.css";

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form.name, form.email, form.password);
    if (res.success) {
      toast.success("Registered");
      nav("/courses");
    } else toast.error(res.message || "Registration failed");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper className="auth-card" sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>Register</Typography>
        <form onSubmit={submit}>
          <TextField label="Full Name" fullWidth required margin="normal" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextField label="Email" fullWidth required margin="normal" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <TextField label="Password" fullWidth required margin="normal" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#EF4444" }}>Register</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
