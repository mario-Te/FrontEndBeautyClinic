import React, { ChangeEvent, useState } from "react";
import SideNavBar from "../Layout/SideNavbar";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Input,
  Typography,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import { styled } from "@mui/system";
import {
  ArrowLeftOutlined,
  CheckCircle,
  CloudUpload,
} from "@material-ui/icons";
import { selectAuthentication } from "../slices/auth";
import { useSelector } from "react-redux";
import SuccessfulBadge from "../components/SuccessfulBadge";
import ErrorBadge from "../components/ErrorBadge";
import { Navigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  ArrowCircleLeftSharp,
  ArrowLeft,
  ArrowRightAltSharp,
} from "@mui/icons-material";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rebeccapurple",
}));
const FormContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
  width: "50%",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  padding: 45,
  borderRadius: "15px",
  marginTop: 25,
  marginBottom: 25,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

interface UserFormData {
  oldpassword: string;
  newpassword: string;
  confirmedpassword: string;
}
const UpdateProfile: React.FC = () => {
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const [formData, setFormData] = React.useState<UserFormData>({
    oldpassword: "",
    newpassword: "",
    confirmedpassword: "",
  });

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkLength = (pwd: string) => {
    return pwd.length >= 8;
  };
  const [submissionStatus, setSubmissionStatus] = useState<Boolean>(false);
  const [errorStatus, seterrorStatus] = useState<Boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (
        checkLength(formData.newpassword) &&
        formData.confirmedpassword === formData.newpassword
      ) {
        await axios
          .put(`${process.env.PUBLIC_URL}/auth/updatepassword`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.message === "Document updated successfully")
              setSubmissionStatus(true);
            else throw Error("Can't Update user");
          });
      }
    } catch (error) {
      console.error("Error Updating User:", error);
      seterrorStatus(true);
    }
  };

  if (!!!authentication.accessToken) return <Navigate to="/" replace />;

  return (
    <>
      <FormContainer maxWidth="sm">
        {submissionStatus && (
          <SuccessfulBadge badgeText="Your Profile Updated successfully" />
        )}
        {errorStatus && <ErrorBadge badgeText="Error Updating profile" />}
        <Typography variant="h4" align="center" gutterBottom>
          Update My Password
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password-field"> Old Password</InputLabel>
          <Input
            aria-required
            id="password-field"
            type="password"
            name="oldpassword"
            value={formData.oldpassword}
            onChange={handleFormUpdate}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password-field"> New Password</InputLabel>
          <Input
            aria-required
            id="password-field"
            type="password"
            name="newpassword"
            value={formData.newpassword}
            onChange={handleFormUpdate}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password-field"> Confirm Password</InputLabel>
          <Input
            aria-required
            id="password-field"
            type="password"
            name="confirmedpassword"
            value={formData.confirmedpassword}
            onChange={handleFormUpdate}
            error={formData.newpassword !== formData.confirmedpassword}
            required
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          type="button"
          style={{ marginTop: 15 }}
        >
          Update
        </Button>
        <Box sx={{ my: 5, display: "flex", justifyContent: "flex-start" }}>
          <StyledLink to="/updateProfile">
            Update your info?
            <IconButton color="inherit">
              <ArrowCircleLeftSharp />
            </IconButton>
          </StyledLink>
        </Box>
      </FormContainer>
    </>
  );
};

export default UpdateProfile;
