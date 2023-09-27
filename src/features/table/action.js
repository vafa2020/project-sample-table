import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/table";

export const getCustomers = createAsyncThunk("table/getCustomers", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addCustomer = createAsyncThunk(
  "table/addCustomer",
  async (coustomer) => {
    const response = await axios.post(BASE_URL, coustomer);
    return response.data;
  }
);
export const deleteCustomer = createAsyncThunk(
  "table/deleteCustomer",
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

export const getCustomer = createAsyncThunk("table/getCustomer", async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
});

export const editCustomer = createAsyncThunk(
  "table/editCustomer",
  async (customer) => {
    const response = await axios.patch(`${BASE_URL}/${customer?.id}`, customer);
    return response.data;
  }
);
