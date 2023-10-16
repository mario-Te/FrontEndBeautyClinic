import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Container,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SideNavBar from "../../../Layout/SideNavbar";
import { styled } from "@mui/material/styles";
import { AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SpinnerLoader from "../../../components/SpinnerLoader";
interface Message {
  _id: string;
  reviewer: string;
  text: string;
  about: string;
  rate: number;
}
const StyledLink = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
  marginX: 15,
}));
const StyledHead = styled(TableHead)(() => ({
  textDecoration: "none",
  color: "whitesmoke",
  backgroundColor: "rebeccapurple",
}));
const StyledTableCell = styled(TableCell)(() => ({
  color: "white",
  fontFamily: "Arial",
  fontSize: 18,
}));
const DataTable: React.FC = () => {
  const [data, setData] = useState<Message[]>();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the data from the server-side API
    axios
      .get(`${process.env.PUBLIC_URL}/reviews/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  }, []);
  const handleDropSelected = () => {
    if (selectedRows.length > 0) {
      const confirmed = window.confirm(
        "Are you sure you want to delete the selected rate?"
      );
      if (confirmed) {
        const selectedIds = selectedRows.slice(); // Create a copy of selected rows
        Promise.all(
          selectedIds.map((id) =>
            axios.delete(`${process.env.PUBLIC_URL}/reviews/${id}`)
          )
        )
          .then(() => {
            // Remove the deleted appointments from the data array
            const updatedData = data?.filter(
              (item) => !selectedIds.includes(item._id)
            );
            setData(updatedData);
            setSelectedRows([]);
          })
          .catch((error) => {
            console.error("Failed to delete selected Reviews", error);
            // Handle the error accordingly
          });
      }
    }
  };
  const handleSelectAll = () => {
    if (data)
      if (selectedRows.length === data.length) {
        setSelectedRows([]);
      } else {
        const allRowIds = data.map((item) => item._id);
        setSelectedRows(allRowIds);
      }
  };
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  if (!data) {
    return <SpinnerLoader />;
  }

  return (
    <Container sx={{ my: 5 }}>
      <SideNavBar></SideNavBar>
      <Grid>
        <Container
          sx={{ display: "flex", my: 5, justifyContent: "space-between" }}
        >
          <Typography variant="h4" sx={{ alignSelf: "center" }}>
            Reviews Table
          </Typography>
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "rebeccapurple",
            }}
          >
            <input
              type="checkbox"
              checked={selectedRows.length === data?.length}
              onChange={handleSelectAll}
              aria-label="Select All"
            />
            <Typography>Select All</Typography>
          </Box>

          <IconButton aria-label="drop" onClick={() => handleDropSelected()}>
            <DeleteIcon sx={{ color: "rebeccapurple" }} />
            <Typography color={"rebeccapurple"} variant="body2">
              {" "}
              Drop{" "}
            </Typography>
          </IconButton>
        </Container>
        <Table>
          <StyledHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Review</StyledTableCell>
              <StyledTableCell>Text</StyledTableCell>
              <StyledTableCell>About</StyledTableCell>
              <StyledTableCell>Rate</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledHead>
          <TableBody>
            {data?.map((item: Message, index) => (
              <TableRow key={index}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.reviewer}</TableCell>
                <TableCell>{item.text}</TableCell>
                <TableCell>{item.about}</TableCell>
                <TableCell>{item.rate}</TableCell>
                <TableCell>
                  {" "}
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item._id)}
                    onChange={() => handleRowSelect(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Container>
  );
};

export default DataTable;
