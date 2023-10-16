import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthentication } from "../slices/auth";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "whitesmoke",
  [theme.breakpoints.down("md")]: {
    fontSize: 13,
    paddingX: theme.spacing(3),
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "rebeccapurple",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledTypograph = styled(Typography)(({ theme }) => ({
  color: "white",
  flexGrow: 0.05,
  fontSize: 22,
  [theme.breakpoints.down("md")]: {
    fontSize: 15,
    flexGrow: 0.1,
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authentication = useSelector(selectAuthentication);
  const isLoggedIn: boolean = !!authentication.accessToken;
  const isAdmin: boolean = authentication.Role === "Admin";
  const Username = authentication.UserName;
  let navigate = useNavigate();
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "mobile-menu-popover" : undefined;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <StyledIconButton
            edge="start"
            color="inherit"
            aria-label="open mobile menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </StyledIconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <List>
              <ListItem button component={StyledLink} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              {isAdmin && (
                <ListItem button component={StyledLink} to="/AdminDashboard">
                  <ListItemText primary="Dashboard" />
                </ListItem>
              )}
              <ListItem button component={StyledLink} to="/about">
                <ListItemText primary="About Us" />
              </ListItem>
              {!isLoggedIn ? (
                <ListItem button component={StyledLink} to="/register">
                  <ListItemText primary="Register" />
                </ListItem>
              ) : (
                <ListItem button component={StyledLink} to={`/${Username}`}>
                  <ListItemText primary="Profile" />
                </ListItem>
              )}
            </List>
          </Popover>
          <StyledLink to="/">
            <img
              src={"/images/pngtree-beauty-logo-png-image_8187383.png"}
              alt="Logo"
              style={{
                height: "50px",
                marginLeft: 20,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />{" "}
            {/* Add this line to display the logo */}
          </StyledLink>
          <Box
            sx={{
              display: "flex",
              width: "80%",
              ml: "10%",
              justifyContent: "center",
            }}
          >
            <StyledTypograph variant="h6" noWrap>
              <StyledLink to="/">Home</StyledLink>
            </StyledTypograph>
            {isAdmin && (
              <StyledTypograph variant="h6" noWrap>
                <StyledLink to="/AdminDashboard">Dashboard</StyledLink>
              </StyledTypograph>
            )}
            <StyledTypograph variant="h6" noWrap>
              <StyledLink to="/about">About Us</StyledLink>
            </StyledTypograph>
            <StyledTypograph variant="h6" noWrap>
              {!isLoggedIn ? (
                <StyledLink to="/register">Register</StyledLink>
              ) : (
                <StyledLink to={`/${Username}`}>{Username}</StyledLink>
              )}
            </StyledTypograph>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
