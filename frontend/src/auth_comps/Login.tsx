import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

import { Token } from "src/types/Token.type";
import { User } from "src/types/UserResponse.type";


const Login: React.FC = () => {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nav = useNavigate();
  const API_URL: string = "http://localhost:8000";

  const loginUser = async (email: string, password: string): Promise<Token> => {
    try {
      const userToken = await axios.post<Token>(
        `${API_URL}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return userToken.data;
    } catch (err) {
      throw err;
    }
  };

  const getUserInfo = async (accessToken: string): Promise<User> => {
    try {
      const currentUser = await axios.get<User>(
        `${API_URL}/users/get_user_info`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return currentUser.data;

    } catch (err) {
      throw err;
    }
  };

  const saveTokensToLocalStorage = (
    accessToken: string,
    refreshToken: string
  ): void => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  };

  const saveUserToLocalStorage = (user: any): void => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const userToken = await loginUser(email, password);
      saveTokensToLocalStorage(userToken.access_token, userToken.refresh_token);
      const currentUser = await getUserInfo(userToken.access_token);
      saveUserToLocalStorage(currentUser);
      nav(`/home/${currentUser.name}`);
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
