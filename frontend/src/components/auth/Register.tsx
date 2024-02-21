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
import {
  getUserInfo,
  saveTokensToLocalStorage,
  saveUserToLocalStorage,
} from "./TokenFuncs";
import { Token } from "../../types/Token.type";
import RegisterDisplay from "../display/auth/RegisterDisplay";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [incorrectEmailFormat, setIncorrectEmailFormat] =
    useState<boolean>(false);
  const [incorrectPasswordFormat, setIncorrectPasswordFormat] =
    useState<boolean>(false);
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
        }
      );

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

  const handleRegister = async (): Promise<void> => {
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
      saveTokensToLocalStorage(
        userTokenAfterRegister.access_token,
        userTokenAfterRegister.refresh_token
      );
      const currentUser = await getUserInfo(
        userTokenAfterRegister.access_token
      );
      saveUserToLocalStorage(currentUser);
      nav(`/user/${currentUser.name}`);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <RegisterDisplay
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      incorrectEmailFormat={incorrectEmailFormat}
      incorrectPasswordFormat={incorrectPasswordFormat}
      emailAlreadyRegistered={emailAlreadyRegistered}
      handleRegister={handleRegister}
    />
  );
};

export default Register;
