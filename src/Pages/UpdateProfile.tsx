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
import { CheckCircle, CloudUpload } from "@material-ui/icons";
import { selectAuthentication } from "../slices/auth";
import { useSelector } from "react-redux";
import SuccessfulBadge from "../components/SuccessfulBadge";
import ErrorBadge from "../components/ErrorBadge";
import { Navigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  ArrowCircleRightSharp,
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
  password: string;
  file: File | null;
  bio: string;
  speclization: string;
}
const UpdateProfile: React.FC = () => {
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const [formData, setFormData] = React.useState<UserFormData>({
    password: "",
    bio: "",
    speclization: "",
    file: null,
  });

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkLength = (pwd: string) => {
    return pwd.length >= 8;
  };
  const [submissionStatus, setSubmissionStatus] = useState<Boolean>(false);
  const [errorStatus, seterrorStatus] = useState<Boolean>(false);
  const [newconfirmedpwd, setconfirmedpwd] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (checkLength(formData.password)) {
        await axios
          .post(`${process.env.PUBLIC_URL}/auth/updateProfile`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] });
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
          Update My Profile
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="bio-field">Bio</InputLabel>
          <Input
            id="bio-field"
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleFormUpdate}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="speclization-field">Specialization</InputLabel>
          <Input
            id="speclization-field"
            type="text"
            name="speclization"
            value={formData.speclization}
            onChange={handleFormUpdate}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password-field"> Old Password</InputLabel>
          <Input
            aria-required
            id="password-field"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormUpdate}
            error={!checkLength(formData.password) && formData.password !== ""}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Input
            id="image-upload"
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
              style={{ color: "white", backgroundColor: "rebeccapurple" }}
            >
              Upload Image
            </Button>
          </label>
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
        <Box sx={{ my: 5, display: "flex", justifyContent: "flex-end" }}>
          <StyledLink to="/updatePassword">
            {" "}
            Update your pasword?
            <IconButton color="inherit">
              <ArrowCircleRightSharp />
            </IconButton>
          </StyledLink>
        </Box>
      </FormContainer>
    </>
  );
};

export default UpdateProfile;
