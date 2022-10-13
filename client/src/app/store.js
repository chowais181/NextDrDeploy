import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import profileReducer from "../features/profile/profileSlice";
import appointmentReducer from "../features/appointment/appointmentSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    appointment: appointmentReducer,
  },
});

export default store;
