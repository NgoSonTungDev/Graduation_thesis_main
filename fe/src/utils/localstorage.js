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

export const setOrderLocalStorage = (data) => {
  return localStorage.setItem("order", JSON.stringify(data));
};

export const removeOrderLocalStorage = () => {
  return localStorage.removeItem("order");
};
