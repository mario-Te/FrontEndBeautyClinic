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
import { AddCircle, AddIcCall } from "@mui/icons-material";
import IconButton from "@material-ui/core/IconButton";
import SideNavBar from "../../../Layout/SideNavbar";
import { styled } from "@mui/material/styles";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthentication } from "../../../slices/auth";
import { fetchServices } from "../../../services/SpaServices";
import { AppDispatch } from "../../../store";

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  summary: string;
}
const StyledLink = styled(Link)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  marginX: 15,
}));
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
  const [data, setData] = useState<Service[]>();
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  useEffect(() => {
    // Fetch the data from the server-side API
    axios
      .get(`${process.env.PUBLIC_URL}/services/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  }, []);
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleUpdate = (id: string) => {
    navigate(`/UpdateService/${id}`);
  };
  const handleDropSelected = () => {
    if (selectedRows.length > 0) {
      const confirmed = window.confirm(
        "Are you sure you want to delete the selected Services?"
      );
      if (confirmed) {
        const selectedIds = selectedRows.slice(); // Create a copy of selected rows
        Promise.all(
          selectedIds.map((id) =>
            axios.delete(`${process.env.PUBLIC_URL}/services/${id}`)
          )
        )
          .then(() => {
            console.log("Delete selected Services");
            dispatch(fetchServices());
            // Remove the deleted appointments from the data array
            const updatedData = data?.filter(
              (item) => !selectedIds.includes(item._id)
            );
            setData(updatedData);
            setSelectedRows([]);
          })
          .catch((error) => {
            console.error("Failed to delete selected Services", error);
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
  return (
    <Container sx={{ my: 5 }}>
      <SideNavBar></SideNavBar>
      <Grid>
        <Container
          sx={{ display: "flex", my: 5, justifyContent: "space-between" }}
        >
          <Typography variant="h4" sx={{ alignSelf: "center" }}>
            Services Table
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
            to="/AdminDashboard/addservices"
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
              <StyledTableCell>title</StyledTableCell>
              <StyledTableCell>description</StyledTableCell>
              <StyledTableCell>summary</StyledTableCell>
              <StyledTableCell>price</StyledTableCell>
              <StyledTableCell>image</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledHead>
          <TableBody>
            {data?.map((item: Service, index) => (
              <TableRow key={index}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.summary}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.image}</TableCell>
                <TableCell sx={{ display: "flex", borderBottom: "0" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item._id)}
                    onChange={() => handleRowSelect(item._id)}
                  />
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleUpdate(item.title)}
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
