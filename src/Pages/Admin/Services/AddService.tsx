import React, { useState } from "react";
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
} from "@material-ui/core";
import axios from "axios";
import { styled } from "@mui/system";
import { CloudUpload } from "@material-ui/icons";
import { selectAuthentication } from "../../../slices/auth";
import { useDispatch, useSelector } from "react-redux";
import SuccessfulBadge from "../../../components/SuccessfulBadge";
import ErrorBadge from "../../../components/ErrorBadge";
import { fetchServices } from "../../../services/SpaServices";
import { AppDispatch } from "../../../store";
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

interface serviceFormData {
  title: string;
  description: string;
  price: number;
  file: File | null;
  summary: string;
}
const App: React.FC = () => {
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const [formData, setFormData] = React.useState<serviceFormData>({
    title: "",
    description: "",
    price: 0,
    file: null,
    summary: "",
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [submissionStatus, setSubmissionStatus] = useState<Boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [errorStatus, seterrorStatus] = useState<Boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (formData.file)
        await axios
          .post(`${process.env.PUBLIC_URL}/services/add`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data.message === "New Service is added") {
              setSubmissionStatus(true);
              dispatch(fetchServices());
            } else throw Error("Can't add service");
          });
    } catch (error) {
      console.error("Error uploading file:", error);
      seterrorStatus(true);
    }
  };

  return (
    <>
      <SideNavBar />
      <FormContainer maxWidth="sm">
        {submissionStatus && (
          <SuccessfulBadge badgeText="This Service is added successfully" />
        )}
        {errorStatus && <ErrorBadge badgeText="Can't add this service" />}
        <Typography variant="h4" align="center" gutterBottom>
          Add Service
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="title-field">Title</InputLabel>
          <Input
            id="title-field"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormUpdate}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="description-field">description</InputLabel>
          <Input
            id="text-field"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleFormUpdate}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextareaAutosize
            id="text-field"
            value={formData.summary}
            name="summary"
            minRows={15}
            placeholder="Summary"
            onChange={(e) => {
              setFormData({ ...formData, summary: e.target.value });
            }}
            style={{ width: "98%", resize: "none" }} // Apply common width style
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="price-field">Price</InputLabel>
          <Input
            id="price-field"
            type="number"
            value={formData.price}
            name="price"
            onChange={handleFormUpdate}
            required
          />
        </FormControl>{" "}
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
          disabled={!formData.file}
          type="button"
        >
          Add
        </Button>
      </FormContainer>
    </>
  );
};

export default App;
