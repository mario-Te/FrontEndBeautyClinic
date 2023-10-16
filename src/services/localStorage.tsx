export const setTokens = (authRes: any) => {
  localStorage.setItem("token", JSON.stringify(authRes.token));
};

export const removeTokens = () => {
  localStorage.removeItem("token");
};
export const getAccessToken = () => localStorage.getItem("token")?.slice(1, -1);
export const getUser = (): string | undefined => {
  const userString = localStorage.getItem("user");
  if (userString) {
    return JSON.parse(userString);
  }
  return undefined;
};

export const setUser = (user: any) =>
  localStorage.setItem("user", JSON.stringify(user));
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const removeUser = () => {
  localStorage.removeItem("user");
};
export const setRole = (role: any) =>
  localStorage.setItem("role", JSON.stringify(role));
export const setAdmin = () => localStorage.setItem("Admin", "true");
export const getRole = () => {
  const userString = localStorage.getItem("role");
  if (userString) {
    return JSON.parse(userString);
  }
  return undefined;
};
export const getAdmin = () => {
  const userString = localStorage.getItem("admin");
  if (userString) {
    return true;
  }
  return undefined;
};
export const removeRole = () => {
  localStorage.removeItem("role");
};
