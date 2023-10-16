import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../services/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchServices } from "../services/SpaServices";
import { Box, alpha, Typography, styled } from "@material-ui/core";
import {
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { selectAuthentication } from "../slices/auth";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import SwiperSlide from "../components/SwiperSlide";
import EmpsSwiperSlideComponent, { Users } from "../components/EmpsSwiperSlide";
import SuccessfulBadge from "../components/SuccessfulBadge";
import ErrorBadge from "../components/ErrorBadge";

dayjs.extend(utc);
dayjs.extend(timezone);

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  backgroundColor: "rebeccapurple",
  color: "white",
  padding: 10,
  borderRadius: "10%",
}));

const Note = styled(Typography)(({ theme }) => ({
  color: "red",
  fontSize: 15,
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
  },
}));
const CardImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    height: "80%",
    objectFit: "cover",
    backgroundPosition: "center center",
  },
}));
const BoxContainer = styled(Box)({
  width: "80%",
  marginLeft: "10%",
  marginTop: "16px",
});
const SummaryTypo = styled(Typography)({
  fontSize: 16,
  marginTop: "50px",
});
const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
}));
interface BookFormData {
  Username: string | undefined;
  serviceName?: string;
  address: string;
  isExternal: boolean;
  date: Dayjs | null;
}
const ServicePge = () => {
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const [bookingSection, setBookingSection] = useState(false);
  const isLoggedIn: boolean = !!authentication.accessToken;
  let { title } = useParams();
  const dispatch = useAppDispatch();
  const service = useSelector((state: RootState) =>
    state.services.services.find((value) => {
      if (value.title === title) return value;
    })
  );
  const [FormData, setFormData] = useState<BookFormData>({
    Username: authentication.UserName,
    serviceName: title,
    address: "",
    isExternal: false,
    date: dayjs.utc("2022-04-17T15:30"),
  });
  const [emps, setEmps] = useState<Users[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<Boolean>(false);
  const [errorStatus, seterrorStatus] = useState<Boolean>(false);
  const ServiceStatus = useSelector(
    (state: RootState) => state.services.status
  );
  useEffect(() => {
    // Fetch services data from an API or perform any initialization here
    if (ServiceStatus === "idle") {
      dispatch(fetchServices());
    }
    axios
      .get(`${process.env.PUBLIC_URL}/auth/services/${title}`)
      .then((res) => setEmps(res.data));
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post(`${process.env.PUBLIC_URL}/appointment/add`, FormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.message == "Appointment added successfully ")
          setSubmissionStatus(true);
        else throw Error("Can't add appintment");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        seterrorStatus(true);
      });
  };

  function handleRadioGroupChange(event: SyntheticEvent<Element, Event>): void {
    if ((event.target as HTMLInputElement).value == "external")
      setFormData({ ...FormData, isExternal: true });
    else setFormData({ ...FormData, isExternal: false });
  }

  return (
    <BoxContainer sx={{ mb: 3 }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h5">
            <b>{service?.title}</b>
          </Typography>

          <CardImage
            src={`/images/services/${service?.image}`}
            alt={service?.title}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <SummaryTypo variant="body1">{service?.summary}</SummaryTypo>
          {!isLoggedIn ? (
            <Grid
              sx={{ display: "flex", marginTop: 5, justifyContent: "center" }}
            >
              <StyledLink color="primary" to="/register">
                Register
              </StyledLink>
              <Typography style={{ marginTop: 5, marginLeft: 5 }}>
                For Booking this service
              </Typography>
            </Grid>
          ) : (
            <Grid
              sx={{ display: "flex", marginTop: 5, justifyContent: "center" }}
            >
              <Button
                style={{
                  backgroundColor: "rebeccapurple",
                  color: "white",
                  padding: 10,
                }}
                onClick={() => setBookingSection(!bookingSection)}
              >
                Book now
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <EmpsSwiperSlideComponent users={emps}></EmpsSwiperSlideComponent>
      </Grid>
      {bookingSection && (
        <Grid container justifyContent={"center"} item xs={12} md={12} my={4}>
          <FormContainer>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                paddingX: 0,
                textAlign: "center",
                overflowY: "none",
              }}
            >
              <Typography variant="h2">Book now</Typography>
              <form
                onSubmit={handleSubmit}
                style={{ width: "70%", marginLeft: "15%" }}
              >
                {submissionStatus && (
                  <SuccessfulBadge
                    display="block"
                    badgeText="This appointment is added successfully"
                  />
                )}

                {errorStatus && (
                  <ErrorBadge
                    display="block"
                    badgeText="Can't add this appointment"
                  />
                )}

                <TextField
                  required
                  name="address"
                  label="Address"
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    setFormData({ ...FormData, address: e.target.value })
                  }
                />
                <Note>
                  * An additional 10% is added when booking the service
                  externally
                </Note>
                <RadioGroup aria-label="Offer" aria-required>
                  <FormControlLabel
                    value="internal"
                    control={<Radio />}
                    label="Internal"
                    onChange={handleRadioGroupChange}
                    name="internal"
                    defaultChecked
                  />
                  <FormControlLabel
                    value="external"
                    control={<Radio />}
                    label="External"
                    onChange={handleRadioGroupChange}
                    name="external"
                  />
                </RadioGroup>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Select Date and Time "
                      onChange={(e: any) =>
                        setFormData({ ...FormData, date: e })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <Container sx={{ display: "grid", marginTop: 5 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "rebeccapurple",
                      fontSize: { xs: 11, md: 15 },
                      width: "50%",
                      ml: "25%",
                    }}
                  >
                    Book
                  </Button>
                </Container>
              </form>
            </Paper>
          </FormContainer>
        </Grid>
      )}
    </BoxContainer>
  );
};

export default ServicePge;
