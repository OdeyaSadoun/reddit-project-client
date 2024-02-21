import { Link } from "react-router-dom";
import { RegisterDisplayProps } from "../../../interfaces/RegisterDisplayProps.interface";

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

const RegisterDisplay: React.FC<RegisterDisplayProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  incorrectEmailFormat,
  incorrectPasswordFormat,
  emailAlreadyRegistered,
  handleRegister,
}) => {
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
                  helperText={
                    incorrectEmailFormat && "Please enter a valid email address"
                  }
                  inputProps={{
                    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
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
                  helperText={
                    incorrectPasswordFormat &&
                    "Password must be at least 8 characters long"
                  }
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

export default RegisterDisplay;
