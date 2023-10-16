import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authenticate, login } from "../services/authenticationService";
import {
  removeTokens,
  setTokens,
  getAccessToken,
  getUser,
  setUser,
  removeUser,
  removeRole,
  getRole,
  setRole,
} from "../services/localStorage";
import { RootState } from "../store/index";

export interface IAuthentication {
  isProcessingRequest: boolean;
  accessToken?: string;
  UserName?: string;
  Role?: string;
}

const initialState: IAuthentication = {
  isProcessingRequest: false,
  accessToken: getAccessToken(),
  UserName: getUser(),
  Role: getRole(),
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    start: (state) => {
      state.isProcessingRequest = true;
    },
    success: (state, action: PayloadAction<any>) => {
      state.isProcessingRequest = false;
      state.accessToken = action.payload.token;
      state.UserName = action.payload.name;
      state.Role = action.payload.role;
    },
    error: (state) => {
      state.isProcessingRequest = false;
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.UserName = undefined;
      state.Role = undefined;
    },
  },
});

export const authenticateUser = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(start()); // Dispatch the 'start' action

    const authData = await authenticate(userData);
    if (authData?.status) {
      setTokens(authData.data);
      setUser(authData.data.name);
      setRole(authData.data.role);
      dispatch(success(authData.data)); // Dispatch the 'success' action with the status
    }
    return authData;
  } catch (err: any) {
    dispatch(error());
    return err;
  }
};
export const { start, success, error, logout } = authenticationSlice.actions;
export const LoginUser = (userData: any) => async (dispatch: any) => {
  try {
    dispatch(start()); // Dispatch the 'start' action

    const authData = await login(userData);
    if (authData?.status) {
      setTokens(authData.data);
      setUser(authData.data.name);
      setRole(authData.data.role);
      dispatch(success(authData.data)); // Dispatch the 'success' action with the status
    }
    return authData;
  } catch (err: any) {
    dispatch(error());
    return err;
  }
};

export const Logout = () => async (dispatch: any) => {
  removeTokens();
  removeUser();
  removeRole();
  dispatch(logout()); // Dispatch the 'logout' action
};

export const selectAuthentication = (state: RootState) => state.authentication;

export const authenticationReducer = authenticationSlice.reducer;
