import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProfiles,
  getSingleProfile,
  createProfile,
  updateProfile,
  addReview,
  deleteReview,
  deleteProfile,
  myProfile,
  updateProfileStatus,
  getAllProfilesUser,
  getAdminProfilesStats,
  addEducation,
  addExperience,
  deleteEducation,
  deleteExperience,
} from "./profileActions";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  profiles: null,
  error: null,
  total_profiles: 0,
  success: false,
  profile: null,
  myProfile: null,
  resultPerPage: 0,
  filteredProfilesCount: 0,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  isDeletedProfile: false,
  avg_fee: 0,
  top_dr: null,
  total_pending_requests: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    //create Profile
    [createProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // profile created successfully
      state.isCreated = true;
      state.myProfile = payload.docProfile;
      toast.success("Doctor profile created successfully");
    },
    [createProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //add education
    [addEducation.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addEducation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // education added successfully
      state.isUpdated = true;
      state.myProfile = payload.profile;
      toast.success("Education added successfully");
    },
    [addEducation.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },
    //add experience
    [addExperience.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addExperience.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // exp added  successfully
      state.isUpdated = true;
      state.myProfile = payload.profile;
      toast.success("Experience added successfully");
    },
    [addExperience.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //delete education
    [deleteEducation.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteEducation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.myProfile = payload.profile;
      toast.success("Education deleted successfully");
    },
    [deleteEducation.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //delte experience
    [deleteExperience.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteExperience.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.isDeleted = true;
      state.myProfile = payload.profile;
      toast.success("Experience deleted successfully");
    },
    [deleteExperience.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //update profile
    [updateProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // profile created successfully
      state.isUpdated = true;
      state.myProfile = payload.profile;
      toast.success("Profile updated successfully");
    },
    [updateProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //update profile status - admin
    [updateProfileStatus.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateProfileStatus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // profile created successfully
      state.isUpdated = true;
      toast.success("Profile status updated successfully");
    },
    [updateProfileStatus.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //delete profile

    [deleteProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // profile created successfully
      state.isDeletedProfile = true;
      toast.success("Profile deleted successfully");
    },
    [deleteProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //all  profiles   -- admin
    [getAllProfiles.pending]: (state) => {
      state.loading = true;
      state.isCreated = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.isDeletedProfile = false;
    },
    [getAllProfiles.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.profiles = payload.profiles;
      state.total_profiles = payload.total_profiles;
      state.resultPerPage = payload.resultPerPage;
      state.filteredProfilesCount = payload.filteredProfilesCount;
    },

    //all  profiles  stats  -- admin
    [getAdminProfilesStats.pending]: (state) => {
      state.loading = true;
      state.isCreated = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.isDeletedProfile = false;
    },
    [getAdminProfilesStats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.avg_fee = payload.avg_fee;
      state.top_dr = payload.top_dr;
      state.total_pending_requests = payload.pending_requests;
    },

    [getAdminProfilesStats.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //all  profiles user
    [getAllProfilesUser.pending]: (state) => {
      state.loading = true;
      state.isCreated = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.isDeletedProfile = false;
    },
    [getAllProfilesUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.profiles = payload.profiles;
      state.resultPerPage = payload.resultPerPage;
      state.filteredProfilesCount = payload.filteredProfilesCount;
    },
    [getAllProfilesUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //get single profile
    [getSingleProfile.pending]: (state) => {
      state.loading = true;
      state.isCreated = false;
    },
    [getSingleProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.profile = payload.profile;
    },
    [getSingleProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //my profile
    [myProfile.pending]: (state) => {
      state.loading = true;
      state.isCreated = false;
    },
    [myProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.myProfile = payload.profile;
    },
    [myProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //add Review
    [addReview.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addReview.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // review created successfully
      state.isCreated = true;
      toast.success("Review added successfully");
    },
    [addReview.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //delete Profile Review
    [deleteReview.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteReview.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // review deleted
      state.profile = payload.profile;
      toast.success("Profile review deleted successfully");
    },
    [deleteReview.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },
  },
});

export default profileSlice.reducer;
