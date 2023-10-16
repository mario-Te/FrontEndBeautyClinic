import React, { ChangeEvent, useState } from "react";
import SideNavBar from "../../../Layout/SideNavbar";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Input,
  Typography,
  TextareaAutosize,
  Badge,
  FormControlLabel,
  FormGroup,
  Radio,
  Checkbox,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { styled } from "@mui/system";
import { CloudUpload } from "@material-ui/icons";
import { selectAuthentication } from "../../../slices/auth";
import { useSelector } from "react-redux";
import SuccessfulBadge from "../../../components/SuccessfulBadge";
import ErrorBadge from "../../../components/ErrorBadge";
import Select from "@mui/material/Select/Select";
import { Service } from "../../../slices/Services";
import { RootState } from "../../../store";
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
const StyledBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: "#5cb85c",
  padding: 15,

  justifyContent: "center",
  display: "flex",
  color: "white",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

interface UserFormData {
  userName: string;
  email: string;
  role: string;
  password: string;
  file: File | null;
  bio: string;
  speclization: string;
}
const App: React.FC = () => {
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const services: Service[] = useSelector(
    (state: RootState) => state.services.services
  );
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = React.useState<UserFormData>({
    userName: "",
    email: "",
    role: "",
    password: "",
    bio: "",
    speclization: "",
    file: null,
  });

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const checkLength = (pwd: string) => {
    return pwd.length >= 8;
  };

  const [submissionStatus, setSubmissionStatus] = useState<Boolean>(false);
  const [errorStatus, seterrorStatus] = useState<Boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (validateEmail(formData.email) && checkLength(formData.password)) {
        await axios
          .post(`${process.env.PUBLIC_URL}/auth/addUser`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.message === "User added successfully")
              setSubmissionStatus(true);
            else throw Error("Can't add user");
          });
      }
    } catch (error) {
      console.error("Error Adding User:", error);
      seterrorStatus(true);
    }
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange: any = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    setSelectedOption(checked ? value : "");
    setFormData({ ...formData, role: event.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  return (
    <>
      <SideNavBar />
      <FormContainer maxWidth="sm">
        {submissionStatus && (
          <SuccessfulBadge badgeText="This User is added successfully" />
        )}
        {errorStatus && <ErrorBadge badgeText="Can't add this user" />}
        <Typography variant="h4" align="center" gutterBottom>
          Add User
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="username-field">UserName</InputLabel>
          <Input
            id="username-field"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleFormUpdate}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Typography variant="caption" color="textSecondary">
            Please enter a valid email address (example: example@example.com)
          </Typography>
          <InputLabel htmlFor="email-field">Email</InputLabel>
          <Input
            id="email-field"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormUpdate}
            required
            error={!validateEmail(formData.email) && formData.email !== ""}
            inputRef={passwordRef}
          />
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          style={{ display: "inline-flex" }}
        >
          <FormGroup style={{ flexDirection: "row" }} color="primary">
            <FormControlLabel
              value="Employee"
              control={<Checkbox checked={selectedOption === "Employee"} />}
              label="Employee"
              onChange={handleCheckboxChange}
            />
            <FormControlLabel
              value="User"
              control={<Checkbox checked={selectedOption === "User"} />}
              label="User"
              onChange={handleCheckboxChange}
            />
          </FormGroup>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Typography variant="caption" color="textSecondary">
            Please enter a long password contains 8 characters at least
          </Typography>
          <InputLabel htmlFor="password-field">Password</InputLabel>
          <Input
            aria-required
            id="password-field"
            type="text"
            name="password"
            value={formData.password}
            onChange={handleFormUpdate}
            error={!checkLength(formData.password) && formData.password !== ""}
            required
          />
        </FormControl>
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
          <InputLabel id="service-label">Select a service</InputLabel>
          <Select
            labelId="Select a service"
            id="select2"
            value={formData.speclization || ""}
            onChange={(e) =>
              setFormData({ ...formData, speclization: e.target.value })
            }
          >
            {services?.map((service) => (
              <MenuItem key={service.id} value={service.title}>
                {service.title}
              </MenuItem>
            ))}
          </Select>
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
        >
          Add
        </Button>
      </FormContainer>
    </>
  );
};

export default App;
