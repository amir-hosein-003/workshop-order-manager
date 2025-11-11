"use client";

import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { refresh } from "next/cache";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Promise used to queue concurrent refresh attempts so only one refresh
// request is made at a time.
let refreshPromise: Promise<any> | null = null;

const isRefreshEndpoint = (config?: AxiosRequestConfig) => {
  if (!config || !config.url) return false;
  return config.url.includes("/api/v1/auth/refresh");
};

if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.debug("[axiosInterceptor] initializing in client");
}

// Optional: log outgoing requests to verify interceptor attachment
axiosInstance.interceptors.request.use(
  (cfg) => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.debug("[axiosInterceptor] request to", cfg?.url);
    }
    return cfg;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const errResponse = error.response;
    const originalConfig = error.config as AxiosRequestConfig | undefined;

    if (!errResponse || errResponse.status !== 401) {
      return Promise.reject(error);
    }

    // Avoid trying to refresh when the failing request was the refresh endpoint
    if (isRefreshEndpoint(originalConfig)) {
      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        // Use global axios to perform refresh to avoid triggering this interceptor
        const baseURL = axiosInstance.defaults.baseURL || "";
        refreshPromise = axios.post(
          "/api/v1/auth/refresh",
          {},
          { withCredentials: true, baseURL }
        );
      }

      const refreshRes = await refreshPromise;
      refreshPromise = null;

      if (refreshRes && refreshRes.status === 200) {
        const newToken = refreshRes.data?.accessToken || refreshRes.data?.token;
        if (newToken) {
          axiosInstance.defaults.headers.common =
            axiosInstance.defaults.headers.common || {};
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;

          if (originalConfig) {
            originalConfig.headers = originalConfig.headers || {};
            originalConfig.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosInstance(originalConfig);
          }
        }
      }
      refreshPromise = null;
      return Promise.reject(error);
    } catch (refreshError) {
      refreshPromise = null;
      return Promise.reject(refreshError);
    }
  }
);
