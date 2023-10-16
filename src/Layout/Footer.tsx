import { Container, Grid, Typography, IconButton, Link } from "@mui/material";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LinkedIn } from "@mui/icons-material";
const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "#FFF",
  marginRight: theme.spacing(1),
}));

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: "rebeccapurple",
  color: "#FFF",
  minHeight: 250,
  padding: "10px 0px 25px 0px",
  marginTop: theme.spacing(4),
}));

const Heading = styled(Typography)(({ theme }) => ({
  color: "#FFF",
  paddingTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Content = styled(Typography)(({ theme }) => ({
  color: "#CCC",
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AddressContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const Icon = styled("i")(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const SocialIconsContainer = styled("ul")({
  display: "table",
  listStyleType: "none",
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Heading variant="h5">Find us</Heading>
            <Content variant="body1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </Content>
            <AddressContainer>
              <Icon className="fa fa-location-arrow" />
              <Typography variant="body1">9878/25 sec 9 rohini 35</Typography>
            </AddressContainer>
            <AddressContainer>
              <Icon className="fa fa-phone" />
              <Typography variant="body1">+91-9999878398</Typography>
            </AddressContainer>
            <AddressContainer>
              <Icon className="fa fa-envelope" />
              <Typography variant="body1">info@example.com</Typography>
            </AddressContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Heading variant="h5">Social links</Heading>
            <SocialIconsContainer>
              <SocialIcon>
                <FacebookIcon sx={{ color: "white" }} />
              </SocialIcon>
              <SocialIcon>
                <TwitterIcon sx={{ color: "white" }} />
              </SocialIcon>
              <SocialIcon>
                <InstagramIcon sx={{ color: "white" }} />
              </SocialIcon>
              <SocialIcon>
                <LinkedIn sx={{ color: "white" }} />
              </SocialIcon>
            </SocialIconsContainer>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};
export default Footer;
