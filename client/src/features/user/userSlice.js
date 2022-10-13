import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  registerUser,
  userLogin,
  userLogout,
  getAllUser,
  deleteUser,
  updateUserRole,
  updateUser,
} from "./userActions";
import toast from "react-hot-toast";
// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  users: null,
  total_doctors: 0,
  total_user: 0,
  resultPerPage: 0,
  success: false,
  isLogin: false,
  isRegister: false,
  isDeleted: false,
  isUpdated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: {
    // logout reducers
    [userLogout.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isLogin = false;
    },
    [userLogout.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.isLogin = false;
    },
    [userLogout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isLogin = true;
    },
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.userToken;
      state.success = true;
      state.isLogin = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isRegister = false;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.isRegister = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // update user
    [updateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // update successful
      state.isUpdated = true;
      toast.success("Your Profile updated successfully");
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.loading = false;
      // toast.error(payload);
    },

    // get user details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
      state.isUpdated=false;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.isUpdated=false;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // get all users -- admin
    [getAllUser.pending]: (state) => {
      state.loading = true;
      state.isDeleted = false;
      state.isUpdated = false;
    },
    [getAllUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.total_user = payload.total_user;
      state.total_doctors = payload.total_doctors;
      state.users = payload.users;
      state.resultPerPage = payload.resultPerPage;
    },
    [getAllUser.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // delete user -- admin
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isDeleted = true;
      toast.success("User deleted successfully");
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    // update user  role -- admin
    [updateUserRole.pending]: (state) => {
      state.loading = true;
    },
    [updateUserRole.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      toast.success("User role updated successfully");
    },
    [updateUserRole.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;
