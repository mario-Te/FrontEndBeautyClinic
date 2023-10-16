import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../services/SpaServices";
import { RootState, AppDispatch } from "../store";
import { Service } from "../slices/Services";
import SwiperSlide from "./SwiperSlide";

const RootContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(5),
}));

const ServiceCards = (props: { forSearch: boolean; title: any }) => {
  const services: Service[] = useSelector(
    (state: RootState) => state.services.services
  );

  const spec_services: Service[] = services.filter((item) => {
    return item.title.toLowerCase().includes(props.title);
  });

  const dispatch = useDispatch<AppDispatch>();
  const ServiceStatus = useSelector(
    (state: RootState) => state.services.status
  );
  useEffect((): void => {
    // Fetch services data from an API or perform any initialization here
    if (ServiceStatus === "idle") {
      dispatch(fetchServices());
    }
  }, []);

  return (
    <RootContainer>
      {!props.forSearch ? (
        <Grid container spacing={2}>
          <Typography
            style={{
              margin: 14,
              fontFamily: "Goudy Bookletter 1911",
              color: "#999999",
            }}
            variant="h2"
          >
            Our Services
          </Typography>
          <SwiperSlide services={services} />
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {spec_services.length > 0 && <SwiperSlide services={spec_services} />}
          {spec_services.length == 0 && (
            <Grid width={"50%"} ml={"35%"}>
              <Typography variant="h4">
                {" "}
                No Service found for {props.title}{" "}
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </RootContainer>
  );
};

export default ServiceCards;
