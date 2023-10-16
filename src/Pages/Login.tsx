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
import { LoginUser, selectAuthentication } from "../slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rebeccapurple",
}));

interface LoginFormData {
  username: string;
  password: string;
}

const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "430px",
  backgroundImage: `url('./images/loginBackgroud.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
}));
interface ErrosData {
  WrongPassword: boolean;
  WrongUser: boolean;
}
const LoginPage: React.FC = () => {
  const authentication = useSelector(selectAuthentication);
  const isLoggedIn: boolean = !!authentication.accessToken;
  let navigate = useNavigate();
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const userRef = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [FormErr, setFormErr] = React.useState<ErrosData>({
    WrongPassword: true,
    WrongUser: true,
  });
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(LoginUser(formData))
      .then((response) => {
        console.log(response);
        if (response.status) navigate("/");
        else if (response.error == "Error: User doesn't exist")
          setFormErr({ ...FormErr, WrongUser: false });
        else if (response.error == "Error: Wrong Credntial")
          setFormErr({ ...FormErr, WrongPassword: false });
      })
      .catch((error: any) => {
        console.log("Login failed:" + error);
      });
  }
  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" sx={{ padding: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <ImageContainer></ImageContainer>
        </Grid>
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
                Sign in
              </Typography>
              <form
                onSubmit={handleSubmit}
                style={{ width: "50%", marginLeft: "25%", paddingTop: 40 }}
              >
                <TextField
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!FormErr.WrongUser}
                  helperText={!FormErr.WrongUser && "User Doesn't exist"}
                  inputRef={userRef}
                />

                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!FormErr.WrongPassword}
                  helperText={
                    !FormErr.WrongPassword && "Email and passwords are wrong"
                  }
                  inputRef={userRef}
                />
                <Box sx={{ display: "grid", textAlign: "Center", padding: 5 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      marginTop: "16px",
                      backgroundColor: "rebeccapurple",
                      fontSize: { xs: 11, md: 15 },
                    }}
                  >
                    Login
                  </Button>
                  <StyledLink to="/register">Not a member?</StyledLink>
                </Box>
              </form>
            </Paper>
          </FormContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
