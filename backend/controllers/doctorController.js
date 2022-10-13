const Doctor = require("../models/doctorModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorHander");
const{sendTokenDoctor, sendToken }= require("../utils/jwtToken");

// register doctor
exports.registerDoctor = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.create(req.body);

  sendTokenDoctor(doctor, 201, res);
});

//login doctor
exports.loginDoctor = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("please enter email and password", 400));
  }

  const doctor = await Doctor.findOne({ email: email }).select("+password");
  if (!doctor) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  // comparing the password
  const isPasswordMatched = await doctor.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid cridentials", 401));
  }

  sendTokenDoctor(doctor, 200, res);
});

// logout Doctor
exports.logoutDoctor = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

// Get Doctor Detail
exports.getDoctorDetails = catchAsyncErrors(async (req, res, next) => {
  
  console.log("my id = ");
  console.log(req.doctor.id)
 
  const doctor = await Doctor.findById(req.doctor.id);


  res.status(200).json({
    success: true,
    doctor,
  });
});

// update Doctor password
exports.  updatePassword = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.doctor.id).select("+password");

  const isPasswordMatched = await doctor.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  doctor.password = req.body.newPassword;

  await doctor.save();

  sendToken(doctor, 200, res);
});

// update Doctor Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };

  const doctor = await Doctor.findByIdAndUpdate(req.doctor.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    doctor,
  });
});

// Get all doctors(admin)
exports.getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await Doctor.find();
  const total_doctors = doctors.length;
  res.status(200).json({
    success: true,
    doctors,
    total_doctors,
  });
});

// Get single doctor (admin)
exports.getSingleDoctor = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorHander(`Doctor does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    doctor,
  });
});

// Delete Doctor --Admin
exports.deleteDoctor = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await doctor.remove();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
