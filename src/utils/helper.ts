import { getAccessToken } from "./token-management";

export const checkIfUserIsAuthenticated = () => {
  const authorizedToken = getAccessToken();

  if (!authorizedToken) {
    return false;
  }

  return true;
};

export const getStateDetails = (states: any, stateId: string) => {
  const stateDetails = states && states?.length > 0 && states.find((eachState: any) => eachState?._id === stateId);
  return stateDetails ?? {};
};
