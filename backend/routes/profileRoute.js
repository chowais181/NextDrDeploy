const express = require("express");
const {
  createProfile,
  getSingleProfile,
  myProfile,
  getAllProfiles,
  updateProfile,
  deleteProfile,
  createProfileReview,
  getProfileReviews,
  deleteProfileReview,
  updateProfileStatus,
  getAllProfilesUser,
  getAllProfilesAdmin,
  addEducation,
  addExperience,
  deleteExp,
  deleteEdu,
} = require("../controllers/profileController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

// first dr login then create profile
router.route("/create-profile").post(isAuthenticatedUser, createProfile);
router
  .route("/my-profile")
  .get(isAuthenticatedUser, myProfile)
  .put(isAuthenticatedUser, updateProfile)
  .delete(isAuthenticatedUser, deleteProfile);


// add education and experience
router.route("/education").put(isAuthenticatedUser, addEducation);
router.route("/experience").put(isAuthenticatedUser, addExperience);
router
  .route("/education/:id")
  .delete(isAuthenticatedUser, deleteEdu);
router
  .route("/experience/:id")
  .delete(isAuthenticatedUser, deleteExp);

// user will give the review to doctor profile
router
  .route("/create-profile-review")
  .post(isAuthenticatedUser, createProfileReview);

router
  .route("/profile-reviews")
  .get(getProfileReviews)
  .delete(isAuthenticatedUser, deleteProfileReview);

// view all doctors and their profile
router.route("/single-profile/:id").get(isAuthenticatedUser, getSingleProfile);
router.route("/all-profiles").get(isAuthenticatedUser, getAllProfiles);
router.route("/all-profiles-user").get(isAuthenticatedUser, getAllProfilesUser);

// admin -----
router
  .route("/update-profile-status/:id")
  .put(isAuthenticatedUser, updateProfileStatus);

router
  .route("/all-profiles-admin")
  .get(isAuthenticatedUser, getAllProfilesAdmin);

module.exports = router;
