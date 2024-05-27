import { getAccessToken } from "./token-management";

export const checkIfUserIsAuthenticated = () => {
  const authorizedToken = getAccessToken();

  if (!authorizedToken) {
    return false;
  }

  return true;
};
