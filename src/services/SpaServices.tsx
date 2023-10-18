import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    console.log(process.env.REACT_APP_PUBLIC_URL);
    try {
     const response = await axios.get(
       `${process.env.REACT_APP_PUBLIC_URL}/services/all`
     );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch services");
    }
  }
);
