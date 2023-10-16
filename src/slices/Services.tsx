import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchServices } from "../services/SpaServices";
export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  summary: string;
}

interface ServicesState {
  services: Service[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ServicesState = {
  services: [],
  status: "idle",
  error: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    getByName: (state, action) => {
      state.services.forEach((value) => {
        if (value.title === action.payload) return value;
        else return null;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.status = "succeeded";
          state.services = action.payload;
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  /* Add other action creators if needed */
  getByName,
} = servicesSlice.actions;

export default servicesSlice.reducer;
