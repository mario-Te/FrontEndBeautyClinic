import { getAccessToken } from "./localStorage";
import axios from "axios";

export interface AuthPayload {
  username: string;
  password: string;
  email: string;
}
export interface AdminPayload {
  username: string;
  password: string;
}
export interface AuthResponse {
  status: boolean;
  data: {
    token: string | undefined;
    name: string | undefined;
    role: string | undefined;
  };
}

export const authenticate = async (data: AuthPayload) => {
  try {
    const response = await axios.post(
      `${process.env.PUBLIC_URL}/auth/register`,
      data
    );
    return {
      status: true,
      data: {
        token: response.data.accessToken,
        name: response.data.Username,
        role: response.data.role,
      },
    };
  } catch (error: any) {
    return {
      status: false,
      data: {
        msg: "Registeration Failed",
      },
      error: error.response.data.error,
    };
  }
};

export const isAuthenticated = (): boolean => {
  return getAccessToken() ? true : false;
};
export const login = async (data: AuthPayload) => {
  try {
    const response = await axios.post(
      `${process.env.PUBLIC_URL}/auth/login`,
      data
    );
    return {
      status: true,
      data: {
        token: response.data.accessToken,
        name: response.data.Username,
        role: response.data.role,
      },
    };
  } catch (error: any) {
    return {
      status: false,
      data: {
        msg: "LoginFailed",
      },
      error: error.response.data.error,
    };
  }
};
export const CheckAdmin = async (formData: AdminPayload) => {
  try {
    const response = await axios.post(
      `${process.env.PUBLIC_URL}/auth/checkAdmin`,
      formData
    ); //
    return {
      status: response.data.isAdmin,
    };
  } catch (error) {
    throw new Error("isNotAdmin");
  }
};

export const FetchUser = async (user: string) => {
  try {
    const response = await axios.get(`${process.env.PUBLIC_URL}/auth/${user}`); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch services");
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${process.env.PUBLIC_URL}/users/all`); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch services");
  }
};
