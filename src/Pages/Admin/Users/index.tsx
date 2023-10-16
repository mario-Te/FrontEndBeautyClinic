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
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@material-ui/core/IconButton";
import SideNavBar from "../../../Layout/SideNavbar";
import { styled } from "@mui/material/styles";
import { selectAuthentication } from "../../../slices/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import SpinnerLoader from "../../../components/SpinnerLoader";
const StyledLink = styled(Link)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  marginX: 15,
}));
interface User {
  _id: string;
  name: string;
  email: string;
  Role: string;
  Bio: string;
  speclization: string;
  Image: string;
}
const StyledHead = styled(TableHead)(({ theme }) => ({
  textDecoration: "none",
  color: "whitesmoke",
  backgroundColor: "rebeccapurple",
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "white",
  fontFamily: "Arial",
  fontSize: 18,
}));
const DataTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [data, setData] = useState<User[]>();
  useEffect(() => {
    // Fetch the data from the server-side API
    axios
      .get(`${process.env.PUBLIC_URL}/auth/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  }, []);

  const handleUpdate = (id: string) => {
    // Implement the logic to update the appointment with the given id
    // Navigate to the update page or display a modal for editing the appointment data
  };
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  const handleDropSelected = () => {
    if (selectedRows.length > 0) {
      const confirmed = window.confirm(
        "Are you sure you want to delete the selected user(s)?"
      );
      if (confirmed) {
        const selectedIds = selectedRows.slice(); // Create a copy of selected rows
        Promise.all(
          selectedIds.map((id) =>
            axios.delete(`${process.env.PUBLIC_URL}/auth/${id}`)
          )
        )
          .then(() => {
            console.log("Delete selected Users");
            // Remove the deleted appointments from the data array
            const updatedData = data?.filter(
              (item) => !selectedIds.includes(item._id)
            );
            setData(updatedData);
            setSelectedRows([]);
          })
          .catch((error) => {
            console.error("Failed to delete selected Users", error);
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
            User Table
          </Typography>
          <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
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

          <StyledLink
            to="/AdminDashboard/addUser"
            style={{ display: "flex", fontSize: "33px" }}
          >
            <IconButton style={{ color: "rebeccapurple" }} size="medium">
              <AddCircle />
            </IconButton>
          </StyledLink>
        </Container>
        <Table>
          <StyledHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Bio</StyledTableCell>
              <StyledTableCell>Specialzation</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledHead>
          <TableBody>
            {data?.map((item: User, index) => (
              <TableRow key={index}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.Role}</TableCell>
                <TableCell>{item.Bio}</TableCell>
                <TableCell>{item.speclization}</TableCell>
                <TableCell>{item.Image}</TableCell>

                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item._id)}
                    onChange={() => handleRowSelect(item._id)}
                  />
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleUpdate(item._id)}
                  >
                    <EditIcon />
                  </IconButton>
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
