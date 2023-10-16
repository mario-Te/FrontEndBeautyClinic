import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  Avatar,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import { selectAuthentication } from "../slices/auth";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface Comment {
  _id: string;
  user: string;
  comment: string;
  date: string;
  avatar: string;
  rate: number;
}

interface AppProps {
  comments: Comment[];
}

const CommentSection: React.FC<AppProps> = ({ comments }) => {
  const [commentList, setCommentList] = React.useState<Comment[]>(comments);
  const authentication = useSelector(selectAuthentication);
  const currentUsr = authentication.UserName;
  const handleDelete = (e: React.FormEvent, id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmed) {
      axios
        .delete(`${process.env.PUBLIC_URL}/reviews/${id}`)
        .then(() => {
          // Remove the deleted User from the data array
          const updatedComments = commentList.filter((item) => item._id !== id);
          setCommentList(updatedComments);
        })
        .catch((error) => {
          console.error("Failed to delete User", error);
          // Handle the error accordingly
        });
    }
  };
  let navigate = useNavigate();
  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  return (
    <Container sx={{ my: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Typography variant="h5">
              PastReviews ({commentList.length})
            </Typography>
          </Box>

          {commentList.map((comment, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardHeader
                onClick={() => navigate(`/${comment.user}`)}
                avatar={
                  <Avatar
                    src={`/images/users/${comment.avatar}`}
                    alt={comment.user}
                  />
                }
                title={
                  <>
                    <Typography variant="h6" component={"span"}>
                      {comment.user}
                    </Typography>
                    <Typography component={"span"} sx={{ mx: 3 }}>
                      {comment.comment}
                    </Typography>
                    <Typography component={"span"} sx={{ mx: 3, my: 2 }}>
                      {Array.from({ length: comment.rate }).map((_, i) => (
                        <StarIcon key={i} sx={{ color: "#faaf00" }} />
                      ))}
                    </Typography>
                  </>
                }
                subheader={
                  <>
                    <Typography variant="subtitle2">
                      {moment(comment.date).fromNow()}
                    </Typography>
                    {comment.user == currentUsr && (
                      <Typography
                        component={"span"}
                        onClick={(e) => handleDelete(e, comment._id)}
                        sx={{ cursor: "pointer" }}
                      >
                        Delete
                      </Typography>
                    )}
                  </>
                }
              />
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommentSection;
