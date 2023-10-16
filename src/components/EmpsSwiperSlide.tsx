import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/material/styles";
import { Card, Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

export interface Users {
  id: string;
  img: string;
  name: string;
  bio: string;
  specializaion: string;
}

interface SwiperSlideProps {
  users: Users[];
}

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "whitesmoke",
}));

const CardImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const ServiceCard = styled(Card)(({ theme }) => ({
  height: "80%",
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

const CardDescription = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  height: "55px",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const EmpsSwiperSlideComponent: React.FC<SwiperSlideProps> = ({ users }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      breakpoints={{
        // when window width is >= 640px
        2: {
          slidesPerView: 2,
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
      style={{ marginTop: 15 }}
    >
      {users.map((user, index) => (
        <SwiperSlide key={index}>
          <StyledLink to={`/${user.name}`}>
            <ServiceCard>
              <CardImage src={`/images/users/${user.img}`} alt={user.name} />
              <CardContent>
                <CardTitle variant="h5">{user.name}</CardTitle>
                <CardDescription variant="body1">{user.bio}</CardDescription>
                <Typography
                  variant="body1"
                  color="red"
                  sx={{ textAlign: "left", marginTop: 10 }}
                >
                  {/* Add your content here */}
                </Typography>
              </CardContent>
            </ServiceCard>
          </StyledLink>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EmpsSwiperSlideComponent;
