import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, selectAuthentication } from "../slices/auth";
import CommentSection from "../components/Comment";
import StarIcon from "@mui/icons-material/Star";
import { useAppDispatch } from "../services/hooks";
import { AppDispatch } from "../store";
import SpinnerLoader from "../components/SpinnerLoader";
import HomePage from "./Homepage";
import MyCalendar from "../components/Calendar";

const Container = styled("div")`
  margin-top: 5rem;
`;

const Row = styled("div")`
  display: flex;
  justify-content: center;
`;

const Col = styled("div")`
  width: 100%;
  max-width: 28rem;
`;

const StyledCard = styled(Card)`
  border: none;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: #e1bee7;
    transform: scaleY(1);
    transition: all 0.5s;
    transform-origin: bottom;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: #8e24aa;
    transform: scaleY(0);
    transition: all 0.5s;
    transform-origin: bottom;
  }

  &:hover::after {
    transform: scaleY(1);
  }
`;

const ProfileImage = styled("img")`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const Badge = styled("span")`
  background: #8e24aa;
  color: #fff;
  padding: 1px 4px;
  border-radius: 4px;
`;

const Title = styled("h5")`
  margin-top: 2rem;
  margin-bottom: 0;
`;

const Description = styled("p")`
  font-size: 11px;
`;

const SocialList = styled("ul")`
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
`;

const SocialListItem = styled("li")`
  padding: 10px;
  color: #8e24aa;
  font-size: 19px;
`;

const ButtonGroup = styled("div")`
  display: flex;
  margin-top: 1rem;

  button:first-child {
    border: 1px solid #8e24aa !important;
    color: #8e24aa;
    height: 40px;
  }

  button:first-child:hover {
    border: 1px solid #8e24aa !important;
    color: #fff;
    height: 40px;
    background-color: #8e24aa;
  }

  button:last-child {
    border: 1px solid #8e24aa !important;
    background-color: #8e24aa;
    color: #fff;
    height: 40px;
  }
`;
interface User {
  name: string;
  email: string;
  bio: string;
  speclization: string;
  Image: string;
  isSame: boolean;
  Role: string;
}
interface CommentInterface {
  _id: string;
  user: string;
  comment: string;
  date: string;
  avatar: string;
  rate: number;
}
interface ReviewFormData {
  reviewed: string | undefined;
  reviewText: string;
  rating: number;
}

const ProfileCard = () => {
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const isLoggedIn = !!authentication.accessToken;
  let { username } = useParams();
  const [formdata, setformdata] = React.useState<ReviewFormData>({
    reviewed: username,
    rating: 0,
    reviewText: "",
  });
  const [data, setData] = useState<User>();
  const [reviews, setReviewData] = useState<CommentInterface[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    // You can perform additional actions with the review text here
    e.preventDefault();
    axios
      .post(`${process.env.PUBLIC_URL}/reviews/add`, formdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.message == "New Review is added")
          fectchReviews(username);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
    handleClose();
  };
  const handleRatingChange: any = (
    event: React.FormEvent,
    newValue: number
  ) => {
    setformdata({ ...formdata, rating: newValue });
  };
  const [notFound, setNotFound] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout logic here
    dispatch(Logout()).then(() => navigate("/"));
  };
  const fetchUserData = async (
    username: string | undefined,
    token: string | undefined
  ) => {
    await axios
      .get(`${process.env.PUBLIC_URL}/auth/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setNotFound(true);
      });
  };
  const fectchReviews = async (username: string | undefined) => {
    axios
      .get(`${process.env.PUBLIC_URL}/reviews/${username}`, {})
      .then((response) => {
        setReviewData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  };
  useEffect(() => {
    // Fetch services data from an API or perform any initialization here
    fetchUserData(username, token);
    fectchReviews(username);
  }, [username]);

  if (notFound) return <HomePage />;

  return (
    <Container sx={{ my: 5 }}>
      <Row>
        <Col>
          <StyledCard>
            <CardContent>
              <Box style={{ textAlign: "center" }}>
                <ProfileImage
                  src={
                    data?.Image
                      ? `/images/users/${data?.Image}`
                      : `/images/users/default.jpg `
                  }
                  alt="Profile"
                />
              </Box>
              <Box style={{ textAlign: "center", marginTop: "3rem" }}>
                <Title sx={{ fontSize: 20 }}>{username}</Title>
                <Typography variant="subtitle2" sx={{ fontSize: 18 }}>
                  {data?.speclization}
                </Typography>
                <Box style={{ padding: "0 4rem", marginTop: "1rem" }}>
                  <Description sx={{ fontSize: 15 }}>{data?.bio}</Description>
                </Box>

                {isLoggedIn && data?.isSame && (
                  <ButtonGroup
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "66%",
                      ml: "17%",
                      my: 5,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(`/updateProfile`)}
                    >
                      Update Profile
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </ButtonGroup>
                )}
                {isLoggedIn && !data?.isSame && data?.Role == "Employee" && (
                  <>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "rebeccapurple" }}
                      onClick={handleOpen}
                    >
                      <StarIcon />
                      Review
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <DialogTitle>Thanks for sharing your review</DialogTitle>
                      <DialogContent>
                        <Rating
                          name="rating"
                          value={formdata.rating}
                          onChange={handleRatingChange}
                          sx={{ my: 2 }}
                          aria-label="Review"
                        />
                        <TextField
                          label="Your Review"
                          rows={4}
                          value={formdata.reviewText}
                          onChange={(e) =>
                            setformdata({
                              ...formdata,
                              reviewText: e.target.value,
                            })
                          }
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleSubmit}
                          sx={{
                            backgroundColor: "rebeccapurple",
                            color: "white",
                          }}
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                )}
              </Box>
            </CardContent>
          </StyledCard>
        </Col>
      </Row>
      {data?.isSame && (
        <Container sx={{ width: "50%", ml: "25%" }}>
          <MyCalendar />
        </Container>
      )}
      {reviews && data?.Role === "Employee" && (
        <CommentSection comments={reviews}></CommentSection>
      )}
    </Container>
  );
};

export default ProfileCard;
