import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Token } from "../../types/Token.type";
import {
  getUserInfo,
  saveTokensToLocalStorage,
  saveUserToLocalStorage,
} from "./TokenFuncs";

import LoginDisplay from "../display/auth/LoginDisplay";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [incorrectUserOrPassword, setIncorrectUserOrPassword] =
    useState<boolean>(false);

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
    } catch (error: any) {
      if (error.response.status == 400) {
        setIncorrectUserOrPassword(true);
      } else {
        console.error("Error login user:", error);
      }
      return {
        access_token: "",
        refresh_token: "",
      };
    }
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const userToken = await loginUser(email, password);
      saveTokensToLocalStorage(userToken.access_token, userToken.refresh_token);
      const currentUser = await getUserInfo(userToken.access_token);
      saveUserToLocalStorage(currentUser);
      nav(`/user/${currentUser.name}`);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <LoginDisplay
      setEmail={setEmail}
      email={email}
      handleLogin={handleLogin}
      password={password}
      setPassword={setPassword}
      incorrectUserOrPassword={incorrectUserOrPassword}
    />
  );
};

export default Login;
