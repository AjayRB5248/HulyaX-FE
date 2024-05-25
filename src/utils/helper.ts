import { getAccessToken } from "./token-management";

export const checkIfUserIsAuthenticated = () => {
  const authorizedToken = getAccessToken();
  console.log(authorizedToken, "authorizedToken");

  if (!authorizedToken) {
    return false;
  }

  return true;
};
