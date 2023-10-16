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
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SideNavBar from "../../../Layout/SideNavbar";
import { styled } from "@mui/material/styles";
import { AddCircle, Verified } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectAuthentication } from "../../../slices/auth";
import SpinnerLoader from "../../../components/SpinnerLoader";

interface confirmInterface {
  id?: string;
  expert?: string | string[];
  isconfirmend?: boolean;
}
interface Appointment {
  _id: string;
  Username: string;
  ServiceName: string;
  date: object;
  Cost: number;
  address: string;
  expert: string | string[] | undefined;
  status: string;
  isExternal: boolean;
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
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [Id, setID] = useState<string>();
  const [data, setData] = useState<Appointment[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmationData] = useState<confirmInterface>();
  const [empsdata, setempsData] = useState<string[]>();

  const handleOpen = (id: string) => {
    setOpen(true);
    setID(id);
    const ServiceName = data.find((item) => item._id === id)?.ServiceName;

    try {
      axios
        .get(`${process.env.PUBLIC_URL}/auth/emps/${ServiceName}`)
        .then((response) => {
          setempsData(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch data", error);
        });
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DateTimeFormatter = (startTime: string): string => {
    return startTime.replace(/T|Z|\.\d{3}/g, " ").trim();
  };
  useEffect(() => {
    // Fetch the data from the server-side API

    axios
      .get(`${process.env.PUBLIC_URL}/appointment/all`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  }, []);
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      const allRowIds = data.map((item) => item._id);
      setSelectedRows(allRowIds);
    }
  };

  const handleDropSelected = () => {
    if (selectedRows.length > 0) {
      const confirmed = window.confirm(
        "Are you sure you want to delete the selected appointments?"
      );
      if (confirmed) {
        const selectedIds = selectedRows.slice(); // Create a copy of selected rows
        Promise.all(
          selectedIds.map((id) =>
            axios.delete(`${process.env.PUBLIC_URL}/appointment/${id}`)
          )
        )
          .then(() => {
            console.log("Delete selected appointments");
            // Remove the deleted appointments from the data array
            const updatedData = data.filter(
              (item) => !selectedIds.includes(item._id)
            );
            setData(updatedData);
            setSelectedRows([]);
          })
          .catch((error) => {
            console.error("Failed to delete selected appointments", error);
            // Handle the error accordingly
          });
      }
    }
  };
  if (!data) {
    return <SpinnerLoader />;
  }

  const handleConfirm_Reject = async (isconfirmed: boolean) => {
    try {
      await axios.put(
        `${process.env.PUBLIC_URL}/appointment/updatestatus`,
        {
          id: Id,
          isconfirmed: isconfirmed,
          expert: confirmation?.expert,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedData = data.map((item) => {
        if (item._id === Id) {
          return {
            ...item,
            status: isconfirmed ? "Confirmed" : "Rejected",
            expert: isconfirmed ? confirmation?.expert : "",
          };
        }
        return item;
      });
      setData(updatedData);
      setOpen(false); // Close the dialog
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container sx={{ my: 5 }}>
      <SideNavBar />
      <Grid>
        <Container
          sx={{ display: "flex", my: 5, justifyContent: "space-between" }}
        >
          <Typography variant="h4" sx={{ alignSelf: "center" }}>
            Appointment Table
          </Typography>
          <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={selectedRows.length === data.length}
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
            to="/AdminDashboard/addAppointment"
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
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Service Name</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Cost</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Supervisor</StyledTableCell>
              <StyledTableCell>External (T/F)</StyledTableCell>
              <StyledTableCell>Select</StyledTableCell>
            </TableRow>
          </StyledHead>
          <TableBody>
            {data.map((item: Appointment, index) => (
              <TableRow key={index}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.Username}</TableCell>
                <TableCell>{item.ServiceName}</TableCell>
                <TableCell>{DateTimeFormatter(item.date.toString())}</TableCell>
                <TableCell>{item.Cost}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.expert}</TableCell>
                <TableCell>{item.isExternal.toString()}</TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item._id)}
                    onChange={() => handleRowSelect(item._id)}
                    style={{ width: "30%", paddingRight: 10 }}
                  />
                  {item.status == "pending" && (
                    <IconButton
                      color="inherit"
                      style={{ width: "50%", color: "rebeccapurple" }}
                      onClick={() => {
                        handleOpen(item._id);
                      }}
                    >
                      <Verified />
                    </IconButton>
                  )}
                </TableCell>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <DialogTitle>Confirm this appointment</DialogTitle>
                  <DialogContent>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="service-label">
                        Select an expert
                      </InputLabel>
                      <Select
                        id="select2"
                        value={empsdata}
                        onChange={(e) =>
                          setConfirmationData({
                            ...confirmation,
                            expert: e.target.value,
                          })
                        }
                      >
                        {empsdata?.map((emp, index) => (
                          <MenuItem key={index} value={emp}>
                            {emp}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <ButtonGroup
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 4,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ px: 3 }}
                        onClick={() => handleConfirm_Reject(true)}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleConfirm_Reject(false)}
                      >
                        Reject
                      </Button>
                    </ButtonGroup>
                  </DialogActions>
                </Dialog>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Container>
  );
};

export default DataTable;
