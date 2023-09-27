import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "../features/table/tableSlice";

export const store = configureStore({
  reducer: {
    Table: tableSlice,
  },
});
