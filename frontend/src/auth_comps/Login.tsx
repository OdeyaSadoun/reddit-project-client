import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const API_URL: string = "http://localhost:8000";

  const handleLogin = async () => {

    let loginUser: {
      email: string;
      password: string;
    } = {
      email,
      password
    };

    type UserTokenResponse = {
      token: string;
    };

    try {
      let userToken = await axios.post<UserTokenResponse>(`${API_URL}/auth/login`, loginUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("user", userToken.data);

    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3, // Optional: Add padding if needed
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            border: "2px solid #E5D6F2",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F5B3D7" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#EDC2F0",
                "&:hover": {
                  backgroundColor: "#EDC2F0",
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid item>Don't have an account? </Grid>
              <Grid item>
                <Link to="/register">Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
