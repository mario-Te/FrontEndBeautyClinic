import { Grid, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const SectionContainer = styled("section")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60vh",
  backgroundColor: "rebeccapurple",
  fontFamily: "cursive",
});

const ImageContainer = styled(Grid)({
  height: "400px",
  justifyContent: "center",
  backgroundImage: 'url("/images/users/file-1696753414264.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const TextContainer = styled(Grid)({
  display: "flex",
  alignItems: "center",
  padding: "0 40px",
});

const QuoteText = styled(Typography)({
  fontStyle: "italic",
  fontWeight: "bold",
  color: "#fff",
});

const CEO: React.FC = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <Grid container>
          <ImageContainer item xs={12} md={5} />
          <TextContainer item xs={12} md={7}>
            <QuoteText variant="body1">
              "In this fast-paced world we live in, it's crucial to find moments
              of tranquility and self-care. Our beauty spa is not just a place
              of pampering; it's a sanctuary where you can escape the chaos of
              everyday life and embrace the rejuvenating power of self-love. We
              have meticulously crafted an environment that exudes serenity and
              elegance, where every detail has been carefully designed to cater
              to your comfort and delight. From the soft ambient lighting to the
              soothing melodies that embrace you upon arrival, our spa is a
              haven of relaxation."
              <br />
              Mr. Tarek SafiAl-din
              <br />
              BeautyClinic CEO
            </QuoteText>
          </TextContainer>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default CEO;
