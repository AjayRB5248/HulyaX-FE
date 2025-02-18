import jwt, { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useFetchUserById } from "src/api/user";
import { queryClient } from "src/lib/queryClient";
import AuthService from "src/services/auths";

export const storeTokens = (accessToken: string, refreshToken: string, userData?: {}) => {
  queryClient.setQueryData(["accessToken"], accessToken);
  queryClient.setQueryData(["refreshToken"], refreshToken);

  queryClient.setQueryData(["accessToken"], accessToken);
  queryClient.setQueryData(["refreshToken"], refreshToken);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  if (userData && Object.keys(userData).length > 0) {
    queryClient.setQueryData(["user"], userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

export const getAccessToken = (): string | null => {
  return queryClient.getQueryData<string>(["accessToken"]) || localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return queryClient.getQueryData<string>(["refreshToken"]) || localStorage.getItem("refreshToken");
};

export const useUserData = () => {
  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : null;

  const { userDetail , error, isLoading } = useFetchUserById(parsedUser?.id);

  return {
    userDetail,
    error,
    isLoading,
  };
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  queryClient.removeQueries(["accessToken"]);
  queryClient.removeQueries(["refreshToken"]);
  queryClient.removeQueries(["user"]);
};

export const useRefreshToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) throw new Error("No refresh token available");

  const response = await AuthService.refreshToken({ refreshToken }).then((res) => res.data);

  storeTokens(response.access.token, response.refresh.token);

  return response.access.token;
};

export const checkTokenExpiry = async () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    const decodedToken = jwt.decode(accessToken) as JwtPayload;

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken && (decodedToken.exp ?? 0) - currentTime < 300) {
      await useRefreshToken();
    }
  }
};
