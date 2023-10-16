import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircleOutlined,
  Inbox,
  RoomService,
  Event,
  StarBorderPurple500Sharp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));
const drawerWidth = 240;

const Root = styled("div")(({ theme }) => ({
  display: "flex",
}));

const DrawerContainer = styled("div")(({ theme }) => ({
  width: drawerWidth,
  position: "static",
  flexShrink: 0,
}));

const DrawerContent = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

const MainContent = styled("div")({
  flexGrow: 1,
  padding: 16,
});

const VerticalAppBar: React.FC = () => {
  return (
    <Root>
      <DrawerContainer>
        <Drawer variant="permanent" anchor="left">
          <DrawerContent>
            <List>
              <ListItem component={StyledLink} to="/AdminDashboard/users">
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              <ListItem component={StyledLink} to="/AdminDashboard/messages">
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem component={StyledLink} to="/AdminDashboard/services">
                <ListItemIcon>
                  <RoomService />
                </ListItemIcon>
                <ListItemText primary="Services" />
              </ListItem>
              <ListItem
                component={StyledLink}
                to="/AdminDashboard/appointments"
              >
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="Appointments" />
              </ListItem>
              <ListItem component={StyledLink} to="/AdminDashboard/reviews">
                <ListItemIcon>
                  <StarBorderPurple500Sharp />
                </ListItemIcon>
                <ListItemText primary="Rates and reviews" />
              </ListItem>
            </List>
          </DrawerContent>
        </Drawer>
      </DrawerContainer>
      <MainContent>{/* Your main content goes here */}</MainContent>
    </Root>
  );
};

export default VerticalAppBar;
