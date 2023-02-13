export const setUserData = (data) => {
  return localStorage.setItem("user-data", JSON.stringify(data));
};

export const removeUser = () => {
  return localStorage.removeItem("user-data");
};
