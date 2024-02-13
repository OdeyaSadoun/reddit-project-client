import axios from "axios";
import { User } from "../../types/UserResponse.type";

const API_URL: string = "http://localhost:8000";

export const getUserInfo = async (accessToken: string): Promise<User> => {
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

export const saveTokensToLocalStorage = (
  accessToken: string,
  refreshToken: string
): void => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

export const saveUserToLocalStorage = (user: any): void => {
  localStorage.setItem("user", JSON.stringify(user));
};
