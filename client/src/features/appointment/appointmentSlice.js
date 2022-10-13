import { createSlice } from "@reduxjs/toolkit";
import {
  createAppointment,
  getMyAppointmentsUser,
  getMyAppointmentsDoctor,
  deleteAppointmentUser,
  updateAppointmentStatusDoctor,
  getAdminAppStats,
} from "./appointmentActions";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  appointments: null,
  error: null,
  total_appointments: null,
  success: false,
  appointment: null,
  resultPerPage: null,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  all_no_appointments: 0,
  avg_patient_age: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    //create appointment
    [createAppointment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createAppointment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // appointment created successfully
      state.isCreated = true;
      toast.success("Appointment created successfully");
    },
    [createAppointment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //get my  appointments user
    [getMyAppointmentsUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isCreated = false;
    },
    [getMyAppointmentsUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.appointments = payload.myAppointments;
      state.total_appointments = payload.total_appointments;
      state.resultPerPage = payload.resultPerPage;
    },
    [getMyAppointmentsUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //get appointments doctor
    [getMyAppointmentsDoctor.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
    },
    [getMyAppointmentsDoctor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.appointments = payload.myAppointments;
      state.total_appointments = payload.total_appointments;
    },
    [getMyAppointmentsDoctor.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //update appointment status doctor
    [updateAppointmentStatusDoctor.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateAppointmentStatusDoctor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      toast.success("Appointment status updated successfully");
    },
    [updateAppointmentStatusDoctor.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //delete appointment user
    [deleteAppointmentUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteAppointmentUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isDeleted = true;
      toast.success("Appointment cancelled successfully");
    },
    [deleteAppointmentUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //admin appointments stats
    [getAdminAppStats.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAdminAppStats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.all_no_appointments = payload.total_appointments;
      state.avg_patient_age = payload.avg_patient_age;
    },
    [getAdminAppStats.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default profileSlice.reducer;
