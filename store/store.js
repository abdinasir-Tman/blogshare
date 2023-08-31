import postSlice from "@/features/postSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    postState: postSlice,
  },
});

export default store;
