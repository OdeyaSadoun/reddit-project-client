export function getToken(): string {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("User token is not available");
    }

    return token;
  }
  