import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Service } from "../slices/Services";
import { styled } from "@mui/material/styles";
import { Card, Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
interface SwiperSlideProps {
  services: Service[];
}
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "whitesmoke",
}));

const CardImage = styled("img")({
  width: "100%",
  height: "500px",
});
const ServiceCard = styled(Card)(({ theme }) => ({
  height: "70%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));
const CardTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "center",
}));
const SwiperSlideComponent: React.FC<SwiperSlideProps> = ({ services }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      breakpoints={{
        // when window width is >= 640px
        2: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        1280: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
      scrollbar={{ draggable: true }}
    >
      {services.map((service, index) => (
        <SwiperSlide key={index}>
          <StyledLink to={`/services/${service.title}`}>
            <ServiceCard>
              <CardImage
                src={`/images/services/${service.image}`}
                alt={service.title}
              />
              <CardContent>
                <CardTitle variant="h5" sx={{ textAlign: "center" }}>
                  {service.title}
                </CardTitle>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center" }}
                  height={55}
                >
                  {service.description}
                </Typography>
                <Typography
                  variant="body1"
                  color={"red"}
                  sx={{ textAlign: "left", marginTop: 10 }}
                >
                  Price :{service.price} $
                </Typography>
              </CardContent>
            </ServiceCard>
          </StyledLink>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlideComponent;
