const express = require("express");
const ErrorHander = require("../utils/errorHander");
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPEG)$/)) {
      return cb(new ErrorHander("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

const {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  getUserDetails,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateProfile,
  updateUserRole,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/register-user")
  .post(upload.single("profileImage"), registerUser);
router.route("/login-user").post(loginUser);
router.route("/logout-user").get(logoutUser);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router
  .route("/me/update")
  .put(upload.single("avatar"), isAuthenticatedUser, updateProfile);

//... admin routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
