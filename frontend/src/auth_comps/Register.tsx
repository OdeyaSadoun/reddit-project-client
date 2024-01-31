import axios from "axios";
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
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:8000";

  const handleRegister = async () => {
    console.log("enter register");
    
    let newUser = {
      "name": name,
      "email": email,
      "password": password,
      "created_date": new Date()
    };
    console.log({ newUser });
    
    try {
      let userInDb = await axios.post(`${API_URL}/users/register`, newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("user", userInDb.data);
    
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
                />
              </Grid>
            </Grid>
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
