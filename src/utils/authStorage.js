const REGISTERED_USER_KEY = "spotifyRegisteredUser";
const AUTH_SESSION_KEY = "spotifyAuthSession";

export const getRegisteredUser = () => {
  const rawUser = localStorage.getItem(REGISTERED_USER_KEY);

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const saveRegisteredUser = (user) => {
  localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(user));
};

export const saveAuthSession = (user) => {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
};

export const getAuthSession = () => {
  const rawSession = localStorage.getItem(AUTH_SESSION_KEY);

  if (!rawSession) return null;

  try {
    return JSON.parse(rawSession);
  } catch {
    return null;
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_SESSION_KEY);
};
