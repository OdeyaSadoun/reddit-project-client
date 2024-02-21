export const getUserIdFromLocalStorage = (): number => {
  const user: any = JSON.parse(localStorage.getItem("user") || "");
  if (!user) {
    throw new Error("User ID is not available in local storage");
  }

  const userId = Number(user.id);
  if (isNaN(userId)) {
    throw new Error("User ID is not a valid number");
  }

  return userId;
};
