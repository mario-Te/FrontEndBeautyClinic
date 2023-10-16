import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAppDispatch } from "../services/hooks";
import { authenticateUser, selectAuthentication } from "../slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "rebeccapurple",
}));

interface RegistrationFormData {
  username: string;
  password: string;
  email: string;
}
interface ErrosData {
  passwordlength: boolean;
  passwordMatch: boolean;
  TakenUser: boolean;
  TakenEmail: boolean;
}
const ImageContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "482px",
  backgroundImage: `url('./images/loginBackgroud.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const FormContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
}));

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const userRef = React.useRef<HTMLInputElement | null>(null);
  const EmailRef = React.useRef<HTMLInputElement | null>(null);
  const password2Ref = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [password2, setPassword2] = React.useState("");
  const [formData, setFormData] = React.useState<RegistrationFormData>({
    username: "",
    password: "",
    email: "",
  });
  const [FormErr, setFormErr] = React.useState<ErrosData>({
    passwordlength: true,
    passwordMatch: true,
    TakenUser: true,
    TakenEmail: true,
  });
  const authentication = useSelector(selectAuthentication);
  const isLoggedIn: boolean = !!authentication.accessToken;
  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length >= 8) {
      if (formData.password === password2) {
        dispatch(authenticateUser(formData))
          .then((response) => {
            console.log(response);
            if (response.status) navigate("/");
            else if (response.error == "Error: User already exists")
              setFormErr({ ...FormErr, TakenUser: false });
            else if (response.error == "Error: Email already exists")
              setFormErr({ ...FormErr, TakenEmail: false });
          })
          .catch((error: any) => {
            console.error("Registration failed:", error);
          });
      } else {
        setFormErr({ ...FormErr, passwordMatch: false });
        if (password2Ref.current) password2Ref.current.focus();
      }
    } else {
      setFormErr({ ...FormErr, passwordlength: false });
      if (passwordRef.current) passwordRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" sx={{ padding: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
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
              <Typography variant="h4" gutterBottom>
                Sign up
              </Typography>
              <form
                onSubmit={handleSubmit}
                style={{ width: "50%", marginLeft: "25%" }}
              >
                <TextField
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!FormErr.TakenUser}
                  helperText={!FormErr.TakenUser && "User Alerady Taken"}
                  inputRef={userRef}
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!FormErr.TakenEmail}
                  helperText={!FormErr.TakenEmail && "Email Alerady Taken"}
                  inputRef={EmailRef}
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!FormErr.passwordlength}
                  helperText={
                    !FormErr.passwordlength &&
                    "Password should be 8 chars at least"
                  }
                  inputRef={passwordRef}
                />
                <TextField
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                  error={!FormErr.passwordMatch}
                  helperText={
                    !FormErr.passwordMatch && "Passwords do not match"
                  }
                  inputRef={password2Ref}
                />
                <Container sx={{ display: "grid", marginTop: 5 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "rebeccapurple",
                      fontSize: { xs: 11, md: 15 },
                    }}
                  >
                    Register
                  </Button>
                  <StyledLink to="/login">Already Registered?</StyledLink>
                </Container>
              </form>
            </Paper>
          </FormContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ImageContainer></ImageContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
