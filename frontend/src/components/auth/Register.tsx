import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { newUser } from "../../types/NewUser.type";
import { getUserInfo, saveTokensToLocalStorage, saveUserToLocalStorage } from "./TokenFuncs";
import { Token } from "../../types/Token.type";


const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [incorrectEmailFormat, setIncorrectEmailFormat] = useState<boolean>(false);
  const [incorrectPasswordFormat, setIncorrectPasswordFormat] = useState<boolean>(false);
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] =
    useState<boolean>(false);

  const nav = useNavigate();
  const API_URL: string = "http://localhost:8000";

  const addUser = async (user: newUser): Promise<Token> => {
    try {
      const userTokenAfterRegister = await axios.post<Token>(
        `${API_URL}/users/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        });

      return userTokenAfterRegister.data;
    } catch (error: any) {
      if (error.response.status == 400) {
        setEmailAlreadyRegistered(true);
      } else {
        console.error("Error register user:", error);
      }
      return {
        access_token: "",
        refresh_token: "",
      };
    }
  };
  
  const handleRegister = async () : Promise<void>  => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setIncorrectEmailFormat(true);
      return;
    }

    if (password.length < 8) {
      setIncorrectPasswordFormat(true);
      return;
    }

    const newUser: newUser = {
      name,
      email,
      password,
      created_date: new Date(),
    };

    try {
      const userTokenAfterRegister = await addUser(newUser);
      saveTokensToLocalStorage(userTokenAfterRegister.access_token, userTokenAfterRegister.refresh_token);
      const currentUser = await getUserInfo(userTokenAfterRegister.access_token);
      saveUserToLocalStorage(currentUser);
      nav(`/user/${currentUser.name}`);
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
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            border: "2px solid #E5D6F2",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F5B3D7" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={incorrectEmailFormat}
                  helperText={incorrectEmailFormat && "Please enter a valid email address"}
                  inputProps={{
                    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
                    title: "Please enter a valid email address",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={incorrectPasswordFormat}
                  helperText={incorrectPasswordFormat && "Password must be at least 8 characters long"}
                  inputProps={{
                    minLength: 8,
                    title: "Password must be at least 8 characters long",
                  }}
                />
              </Grid>
            </Grid>
            {emailAlreadyRegistered && (
              <Typography sx={{ color: "red", fontSize: 12 }}>
                Email already registered
              </Typography>
            )}
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent="center">
              <Grid item>Already have an account?</Grid>
              <Grid item>
                <Link to="/login">Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
