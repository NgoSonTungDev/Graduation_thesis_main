export const setUserData = (data) => {
  return localStorage.setItem("user-data", JSON.stringify(data));
};

export const removeUser = () => {
  return localStorage.removeItem("user-data");
};

export const setOrderLocalStorage = (data) => {
  return localStorage.setItem("order", JSON.stringify(data));
};

export const removeOrderLocalStorage = () => {
  return localStorage.removeItem("order");
};
