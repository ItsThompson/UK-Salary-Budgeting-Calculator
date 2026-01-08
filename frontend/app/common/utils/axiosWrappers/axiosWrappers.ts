import axiosLibrary, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";

import { AxiosErrorType } from "./constants";

const get = async <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig<any>,
): Promise<R> => {
  try {
    const response: R = await axiosLibrary.get<T, R>(url, config);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `${AxiosErrorType.GET}: ${axiosError.message} - ${axiosError.config.url}`,
    );
  }
};

const post = async <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>,
): Promise<R> => {
  try {
    const response: R = await axiosLibrary.post<T, R>(url, data, config);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `${AxiosErrorType.POST}: ${axiosError.message} - ${axiosError.config.url}`,
    );
  }
};

const put = async <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>,
): Promise<R> => {
  try {
    const response: R = await axiosLibrary.put<T, R>(url, data, config);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `${AxiosErrorType.PUT}: ${axiosError.message} - ${axiosError.config.url}`,
    );
  }
};

const deleteAxios = async <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig<any>,
): Promise<R> => {
  try {
    const response: R = await axiosLibrary.delete<T, R>(url, config);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `${AxiosErrorType.DELETE}: ${axiosError.message} - ${axiosError.config.url}`,
    );
  }
};

const patch = async <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>,
): Promise<R> => {
  try {
    const response: R = await axiosLibrary.patch<T, R>(url, data, config);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `${AxiosErrorType.PATCH}: ${axiosError.message} - ${axiosError.config.url}`,
    );
  }
};

export const axios = {
  get,
  post,
  put,
  delete: deleteAxios,
  patch,
};
