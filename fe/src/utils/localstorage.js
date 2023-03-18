export const setUserDataLocalStorage = (data) => {
  return localStorage.setItem("user", JSON.stringify(data));
};

export const removeUserDataLocalStorage = () => {
  return localStorage.removeItem("user");
};

export const getUserDataLocalStorage = () => {
  const userData = localStorage.getItem("user");
  return JSON.parse(userData);
};
