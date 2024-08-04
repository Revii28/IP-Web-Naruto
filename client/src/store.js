import { configureStore } from "@reduxjs/toolkit";
import villageReducer from "./features/village/villageSlice";
export default configureStore({
  reducer: {
    village: villageReducer
  },
});
