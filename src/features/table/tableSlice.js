import { createSlice } from "@reduxjs/toolkit";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  getCustomer,
  editCustomer,
} from "./action";

const initialState = {
  data: [],
  loading: false,
  error: false,
  customer: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
        state.customer = null;
      })
      .addCase(getCustomers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data.push(action.payload);
        state.customer = null;
      })
      .addCase(addCustomer.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.customer = null;
      })
      .addCase(deleteCustomer.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.customer = action.payload;
      })
      .addCase(getCustomer.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = state.data.map((item) =>
          item.id !== action.payload.id ? item : action.payload
        );
      })
      .addCase(editCustomer.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default tableSlice.reducer;
