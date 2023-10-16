import React from "react";
import { styled } from "@mui/system";
import {
  Button,
  Grid,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { TextareaAutosize } from "@material-ui/core";
import axios from "axios";

const StyledGrid = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: "rebeccapurple",
  color: "white",
  paddingX: 5,
  paddingTop: 40,
}));

interface MessageFormData {
  text: string;
  email: string;
}

const AboutUsSection: React.FC = () => {
  const [Message, setMsg] = React.useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/o/messages/addmsg",
      formData
    );
    setMsg(response.data.message);
  };

  const [formData, setFormData] = React.useState<MessageFormData>({
    email: "",
    text: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ width: "100%", marginY: 5 }}
      id="about"
    >
      <StyledGrid item xs={12} md={6}>
        <Typography variant="h2">ABOUT US</Typography>
        <Typography variant="body1" sx={{ marginY: 5, paddingX: 15 }}>
          Beauty Clinic is a facility that offers a range of wellness and
          relaxation services to promote physical and mental well-being. It is
          designed to provide a serene and rejuvenating environment where
          individuals can escape from the stresses of daily life and focus on
          self-care. At a spa center, clients can indulge in various treatments
          and therapies that cater to their specific needs.
        </Typography>
      </StyledGrid>
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            paddingX: 10,
            textAlign: "center",
            overflowY: "none",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Send Message
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
          >
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextareaAutosize
              name="text"
              aria-label="Text"
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              minRows={10}
              style={{ width: "98%", resize: "none" }}
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
                Send Message
              </Button>
            </Container>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutUsSection;
