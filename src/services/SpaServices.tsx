import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.PUBLIC_URL}/services/all`
      ); // Replace with your API endpoint
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch services");
    }
  }
);
