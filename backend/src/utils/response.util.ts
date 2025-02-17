import { ApiResponse } from "../interfaces/response.interface";

export const createResponse = <T>(
  success: boolean,
  data?: T,
  error?: { message: string; code?: number }
): ApiResponse<T> => {
  return {
    success,
    ...(data && { data }),
    ...(error && { error }),
  };
};
