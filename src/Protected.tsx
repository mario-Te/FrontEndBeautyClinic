import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const AdminPage = (props: {
  isAdmin: boolean;
  Children: ReactElement<any, any>;
}) => {
  if (!props.isAdmin) return <Navigate to="/home" replace />;
  return props.Children;
};

export const AuthorizedUser = (props: {
  isAuthorized: boolean;
  Children: ReactElement<any, any>;
}) => {
  if (!props.isAuthorized) return <Navigate to="/register" replace />;
  return props.Children;
};
export const unAuthorizedUser = (props: {
  isAuthorized: boolean;
  Children: ReactElement<any, any>;
}) => {
  if (props.isAuthorized) return <Navigate to="/profile" replace />;
  return props.Children;
};
