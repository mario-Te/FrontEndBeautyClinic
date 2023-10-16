import React, { useState } from "react";
import { Service } from "../../../slices/Services";
import SideNavBar from "../../../Layout/SideNavbar";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Badge,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import axios from "axios";
import { styled } from "@mui/system";
import utc from "dayjs/plugin/utc";
import { selectAuthentication } from "../../../slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, MenuItem, Select } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

import SuccessfulBadge from "../../../components/SuccessfulBadge";
import { fetchServices } from "../../../services/SpaServices";
import { AppDispatch, RootState } from "../../../store";
import { fetchUsers } from "../../../services/authenticationService";
import ErrorBadge from "../../../components/ErrorBadge";
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
dayjs.extend(utc);
interface AppointmentFormData {
  Username: string | undefined;
  serviceName: string | undefined;
  address: string;
  isExternal: boolean;
  date: Dayjs | null;
}
const App: React.FC = () => {
  const [formData, setFormData] = React.useState<AppointmentFormData>({
    address: "",
    isExternal: false,
    date: dayjs.utc("2022-04-17T15:30"),
    Username: "",
    serviceName: "",
  });

  const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const [submissionStatus, setSubmissionStatus] = useState<Boolean>(false);
  const [errorStatus, seterrorStatus] = useState<Boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await axios
        .post(`${process.env.PUBLIC_URL}/appointment/add4`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.message == "Appointment added successfully")
            setSubmissionStatus(true);
          else throw Error("Can't add appintment");
        });
    } catch (error) {
      console.error("Error uploading file:", error);
      seterrorStatus(true);
    }
  };
  const [selectedOption, setSelectedOption] = useState("internal");
  const services: Service[] = useSelector(
    (state: RootState) => state.services.services
  );
  const handleCheckboxChange: any = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    setSelectedOption(checked ? value : "");
    if (selectedOption !== "internal")
      setFormData({ ...formData, isExternal: false });
    else setFormData({ ...formData, isExternal: true });
  };
  const dispatch = useDispatch<AppDispatch>();
  const ServiceStatus = useSelector(
    (state: RootState) => state.services.status
  );
  const [User, setUsers] = useState<string[]>();
  const [firstRender, setFirstRender] = useState<Boolean>(true);
  React.useEffect(() => {
    // Fetch services data from an API or perform any initialization here
    if (ServiceStatus === "idle") {
      dispatch(fetchServices());
    }
    if (firstRender) {
      axios
        .get(`${process.env.PUBLIC_URL}/auth/allUserNames`)
        .then((response) => {
          setUsers(response.data);
        });
      setFirstRender(false);
    }
  }, []);
  return (
    <>
      <SideNavBar />

      <FormContainer maxWidth="sm" onSubmit={handleSubmit}>
        {submissionStatus && (
          <SuccessfulBadge badgeText="This appointment is added successfully" />
        )}
        {errorStatus && <ErrorBadge badgeText="Can't add this appointment" />}
        <Typography variant="h4" align="center" gutterBottom>
          Add Appointment
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="service-label">Select a service</InputLabel>
          <Select
            labelId="Select a service"
            id="select2"
            value={formData.serviceName || ""}
            onChange={(e) =>
              setFormData({ ...formData, serviceName: e.target.value })
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
          <InputLabel id="select-label">Select a user</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={formData.Username || ""}
            onChange={(e) =>
              setFormData({ ...formData, Username: e.target.value })
            }
            label="Select a user"
          >
            {User?.map((user, index) => (
              <MenuItem key={index} value={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="address-field">address</InputLabel>
          <Input
            id="address-field"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleFormUpdate}
            required
          />
        </FormControl>
        <FormGroup style={{ flexDirection: "row" }} color="primary">
          <FormControlLabel
            value="internal"
            control={<Checkbox checked={selectedOption === "internal"} />}
            label="Internal"
            onChange={handleCheckboxChange}
          />
          <FormControlLabel
            value="external"
            control={<Checkbox checked={selectedOption === "external"} />}
            label="External"
            onChange={handleCheckboxChange}
          />
        </FormGroup>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateTimePicker"]}
              sx={{ height: "200px" }}
            >
              <DateTimePicker
                label="Select Date and Time"
                onChange={(e: any) => setFormData({ ...formData, date: e })}
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>{" "}
        <Button
          variant="contained"
          style={{ backgroundColor: "rebeccapurple", color: "white" }}
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
