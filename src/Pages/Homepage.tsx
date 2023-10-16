import { AppDispatch, RootState } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchServices } from "../services/SpaServices";
import { Box } from "@material-ui/core";
import About from "../components/About";
import ServiceCards from "../components/ServiceCards";
import SpinnerLoader from "../components/SpinnerLoader";
import CEO from "../components/CEO";
const HomePage = () => {
  const services = useSelector((state: RootState) => state.services.services);
  const dispatch = useDispatch<AppDispatch>();
  const ServiceStatus = useSelector(
    (state: RootState) => state.services.status
  );
  useEffect(() => {
    // Fetch services data from an API or perform any initialization here
    if (ServiceStatus === "idle") {
      dispatch(fetchServices());
    }
  }, []);
  return (
    <Box>
      {services.length > 0 ? (
        <ServiceCards forSearch={false} title="=" />
      ) : (
        <SpinnerLoader />
      )}
      <CEO />
      <About />
    </Box>
  );
};

export default HomePage;
