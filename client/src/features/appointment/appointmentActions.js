import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// create Appointment

export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async ({ profileId, formData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `/api/v1/create-appointment?profileId=${profileId}`,

        formData,

        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get my appointments ---- user
export const getMyAppointmentsUser = createAsyncThunk(
  "appointment/getMyAppointmentsUser",
  async ({ currentPage }) => {
    try {
      let link = `/api/v1/my-appointments?page=${currentPage}`;

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

// get my appointments ---- doctor
export const getMyAppointmentsDoctor = createAsyncThunk(
  "appointment/getMyAppointmentsDoctor",
  async (currentPage) => {
    console.log(currentPage);
    try {
      let link = `/api/v1/myAppointments?page=${currentPage}`;

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

// delete appointment user
export const deleteAppointmentUser = createAsyncThunk(
  "appointment/deleteAppointmentUser",
  async (id) => {
    console.log(id);
    try {
      const { data } = await axios.delete(`/api/v1/appointment/${id}`);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

// update appointment status doctor

export const updateAppointmentStatusDoctor = createAsyncThunk(
  "appointment/updateAppointmentStatusDoctor",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/myAppointment/${id}`,
        { status },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// admin appointmenps stats ---

export const getAdminAppStats = createAsyncThunk(
  "appointment/getAdminAppStats",
  async () => {
    try {
      let link = `/api/v1/admin-appointments-stats`;

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);
