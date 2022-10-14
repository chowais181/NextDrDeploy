const User = require("../models/userModel");
var fs = require("fs");
const Profile = require("../models/profileModel");
const gravtar = require("gravatar");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorHander");
const ApiFeatures = require("../utils/apiFeatures");
const { sendToken } = require("../utils/jwtToken");
const sharp = require("sharp");
// for generating the unique id
const { v4: uuidv4 } = require("uuid");

// register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  let fileName;
  let avatar;

  if (req.file) {
    fileName =
      uuidv4() + req.file.originalname.toLowerCase().split(" ").join("-");
    avatar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  } else {
    avatar = gravtar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
  }

  const uploadPic = async () => {
    if (req.file) {
      //configure sharp
      await sharp(req.file.buffer).toFile(
        __dirname + `/../public/images/${fileName}`
      );
    }
  };

  const { email, phoneNumber, password } = req.body;
  let name = req.body.name.toUpperCase();

  const user = await User.create({
    name,
    email,
    phoneNumber,
    password,
    avatar,
  });

  uploadPic();
  sendToken(user, 201, res);
});

//login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("please enter email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  // comparing the password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid credentials", 401));
  }

  sendToken(user, 200, res);
});

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("userToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  let fileName;
  let avatar;

  if (req.file) {
    fileName =
      uuidv4() + req.file.originalname.toLowerCase().split(" ").join("-");
    avatar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  }

  const uploadPic = async () => {
    //configure sharp
    await sharp(req.file.buffer).toFile(
      __dirname + `/../public/images/${fileName}`
    );

    // delete the previous uploaded picture of user
    fs.unlink(
      "./backend/public/images/" +
        req.body.previousPic.substring(
          req.body.previousPic.lastIndexOf("/") + 1
        ),
      function (err) {
        if (err) return console.log(err);
        console.log("Profile Image deleted successfully");
      }
    );
  };

  let name = req.body.name.toUpperCase();
  const newUserData = {
    name: name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };

  if (req.file) {
    newUserData.avatar = avatar;
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (req.file) {
    uploadPic();
  }

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 15;
  //--------------find total drs ----------
  let total_doctors = await User.find({ role: "doctor" });
  total_doctors = total_doctors.length;
  //----------------------

  let users = await User.find({ _id: { $ne: req.user.id } });
  const total_user = users.length;

  const apiFeature1 = new ApiFeatures(
    User.find({ _id: { $ne: req.user.id } }),
    req.query
  ).pagination(resultPerPage);

  users = await apiFeature1.query;

  res.status(200).json({
    success: true,
    resultPerPage,
    total_user,
    total_doctors,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  let avatar = req.query.avatar;

  await Profile.findOneAndDelete({ doctor: req.params.id });
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  //delete the  uploaded picture of this user
  fs.unlink(
    "./backend/public/images/" + avatar.substring(avatar.lastIndexOf("/") + 1),
    function (err) {
      if (err) return console.log(err); 
      console.log("Profile Image deleted successfully");
    }
  );

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
