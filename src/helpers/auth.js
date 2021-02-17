export const getToken = () => {
  const token = localStorage.getItem("token");

  return token ? token : null;
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const getAuthHeader = () => {
  return { AUTH_TOKEN: getToken() };
};
