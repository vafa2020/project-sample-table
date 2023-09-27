import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/table";

export const getCustomers = createAsyncThunk("table/getCustomers", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addCustomer = createAsyncThunk(
  "table/addCustomer",
  async (coustomer) => {
    const response = await axios.post(BASE_URL, coustomer);
    if (response.status === 201) {
      toast.success("عملیات ثبت با موفقیت انجام شد.");
    }
    return response.data;
  }
);
export const deleteCustomer = createAsyncThunk(
  "table/deleteCustomer",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    if (response.status === 200) {
      toast.success("عملیات حذف با موفقیت انجام شد.");
    }
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
    if (response.status === 200) {
      toast.success("عملیات ویرایش با موفقیت انجام شد.");
    }
    return response.data;
  }
);
