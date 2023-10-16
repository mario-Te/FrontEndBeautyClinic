import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Paper, Typography, TextField, Box, Button } from "@mui/material";
import { useAppDispatch } from "../../services/hooks";
import { selectAuthentication } from "../../slices/auth";
import { useSelector } from "react-redux";
import VerticalAppBar from "../../Layout/SideNavbar";

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "rebeccapurple",
}));
const FormContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
  marginBottom: 15,
  marginTop: 15,
}));
interface LoginFormData {
  username: string;
  password: string;
}

const LoginAdmin: React.FC = () => {
  const authentication = useSelector(selectAuthentication);
  const isLoggedIn: boolean = !!authentication.accessToken;

  const [formData, setFormData] = React.useState<LoginFormData>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <VerticalAppBar />
      <Paper
        elevation={3}
        sx={{
          padding: 22,
          paddingX: 0,
          marginBottom: 15,
          textAlign: "center",
          overflowY: "none",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Admin Panel
        </Typography>
      </Paper>
    </>
  );
};

export default LoginAdmin;
