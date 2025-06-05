import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/");
    }

    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get("message");
    if (message) {
      setInfoMessage(message);
    }
  }, [navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box className="login-container">
      <Paper className="login-box" elevation={3}>
        <Typography variant="h4" className="login-title">
          Login
        </Typography>

        {infoMessage && <Alert severity="info" className="login-alert">{infoMessage}</Alert>}
        {error && <Alert severity="error" className="login-alert">{error}</Alert>}

        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <Button type="submit" fullWidth className="login-button">
            Login
          </Button>
        </form>

        <Typography variant="body2" className="login-footer">
          Don't have an account?{" "}
          <Button onClick={() => navigate("/signup")} >
            Sign up
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
