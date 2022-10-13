const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorHander");
const ApiFeatures = require("../utils/apiFeatures");
// -----------------------User : role (doctor)----------------

// create profile
exports.createProfile = catchAsyncErrors(async (req, res, next) => {
  // chech that the profile was created
  const checkProfile = await Profile.find({ doctor: req.user.id });

  if (checkProfile.length > 0) {
    return next(new ErrorHander("Profile already created", 400));
  }

  // assigning the id of the user who created his profile -- role
  req.body.doctor = req.user.id;
  // for searching purpose
  req.body.name = req.user.name;
  const profile = req.body;
  const docProfile = await Profile.create(profile);

  res.status(201).json({
    success: true,
    message: "Doctor profile created successfully",
    docProfile,
  });
});

// get profile of the user having role dr
exports.myProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findOne({ doctor: req.user.id })
    .populate("doctor", "name email phoneNumber avatar")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    });

  res.status(200).json({
    success: true,
    profile,
  });
});

// update profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findOneAndUpdate(
    { doctor: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
    .populate("doctor", "name email phoneNumber avatar")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    });
  res.status(201).json({
    success: true,
    message: "Doctor profile updated successfully",
    profile,
  });
});

// update profile status --- admin

exports.updateProfileStatus = catchAsyncErrors(async (req, res, next) => {
  const newStatus = {
    profileStatus: req.body.status,
  };

  const profile = await Profile.findByIdAndUpdate(req.params.id, newStatus, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!profile) {
    return next(new ErrorHander("No profile found", 404));
  }

  if (req.body.status === "accepted") {
    const role = {
      role: "doctor",
    };
    const user = await User.findByIdAndUpdate(profile?.doctor._id, role, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "Profile status updated successfully",
  });
});
// get single profile
exports.getSingleProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    })
    .populate({
      path: "doctor",
      select: "name phoneNumber avatar",
    });
  res.status(201).json({
    success: true,
    profile,
  });
});

// get all profiles
exports.getAllProfiles = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 10;
  const total_profiles = await Profile.countDocuments();
  const apiFeature = new ApiFeatures(
    Profile.find({ doctor: { $ne: req.user.id } }).populate(
      "doctor",
      "name phoneNumber avatar"
    ),
    req.query
  )
    .search()
    .filter();

  let profiles = await apiFeature.query;
  let filteredProfilesCount = profiles.length;
  const apiFeature1 = new ApiFeatures(
    Profile.find({ doctor: { $ne: req.user.id } }).populate(
      "doctor",
      "name phoneNumber avatar"
    ),
    req.query
  )
    .search()
    .pagination(resultPerPage);

  profiles = await apiFeature1.query;

  res.status(201).json({
    success: true,
    total_profiles,
    resultPerPage,
    filteredProfilesCount,
    profiles,
  });
});

// get all profiles
exports.getAllProfilesUser = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 3;

  const apiFeature = new ApiFeatures(
    Profile.find({
      doctor: { $ne: req.user.id },
      profileStatus: "accepted",
    }).populate("doctor", "name phoneNumber avatar"),
    req.query
  ).search();

  let profiles = await apiFeature.query;
  let filteredProfilesCount = profiles.length;
  const apiFeature1 = new ApiFeatures(
    Profile.find({
      doctor: { $ne: req.user.id },
      profileStatus: "accepted",
    }).populate("doctor", "name phoneNumber avatar"),
    req.query
  )
    .search()
    .pagination(resultPerPage);

  profiles = await apiFeature1.query;

  res.status(201).json({
    success: true,
    resultPerPage,
    filteredProfilesCount,
    profiles,
  });
});

// delete profile
exports.deleteProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await Profile.findOneAndDelete({ doctor: req.user.id });
  if (!profile) {
    return next(new ErrorHander("Profile not found"));
  }

  const role = {
    role: "patient",
  };
  const user = await User.findByIdAndUpdate(req.user.id, role, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Doctor profile deleted successfully",
  });
});

//create doctor profile review
exports.createProfileReview = catchAsyncErrors(async (req, res, next) => {
  const { comment, profileId } = req.body;

  const review = {
    user: req.user.id,
    comment,
  };

  const profileDoc = await Profile.findById(profileId);

  if (!profileDoc) return next(new ErrorHander("profile not found", 404));

  profileDoc.reviews.push(review);
  profileDoc.numOfReviews = profileDoc.reviews.length;

  // validateBeforeSave : it checks the custom defined validations.
  await profileDoc.save({ validateBeforeSave: false });

  const profile = await Profile.findById(profileId)
    .populate("doctor", "name phoneNumber avatar")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    });
  res.status(200).json({
    success: true,
    message: "Review added successfully",
    profile,
  });
});

// -- add education
exports.addEducation = catchAsyncErrors(async (req, res, next) => {
  const { university, degree, from, to, description, current } = req.body;

  const newEdu = {
    university,
    degree,
    from,
    to,
    description,
    current,
  };

  const profileDoc = await Profile.findOne({ doctor: req.user.id });
  if (!profileDoc) return next(new ErrorHander("profile not found", 404));

  profileDoc.education.unshift(newEdu);
  await profileDoc.save();

  const profile = await Profile.findOne({ doctor: req.user.id })
    .populate("doctor", "name phoneNumber avatar")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    });
  res.status(200).json({
    success: true,
    message: "Education added successfully",
    profile,
  });
});

// -- add experience
exports.addExperience = catchAsyncErrors(async (req, res, next) => {
  const { position, institute, from, to, current, description } = req.body;

  const newExp = {
    position,
    institute,
    from,
    to,
    current,
    description,
  };

  const profileDoc = await Profile.findOne({ doctor: req.user.id });
  if (!profileDoc) return next(new ErrorHander("profile not found", 404));

  profileDoc.experience.unshift(newExp);
  await profileDoc.save();

  const profile = await Profile.findOne({ doctor: req.user.id })
    .populate("doctor", "name phoneNumber avatar")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    });
  res.status(200).json({
    success: true,
    message: "Experience added successfully",
    profile,
  });
});

// Delete Education
exports.deleteEdu = catchAsyncErrors(async (req, res, next) => {
  const profil = await Profile.findOne({ doctor: req.user.id });
  // Get remove index
  const removeIndex = profil.education
    .map((item) => item.id)
    .indexOf(req.params.id);

  profil.education.splice(removeIndex, 1);
  await profil.save();

  const profile = await Profile.findOne({ doctor: req.user.id })
    .populate("doctor", "name phoneNumber avatar")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    });

  res.status(200).json({
    success: true,
    message: "Education deleted successfully",
    profile,
  });
});

// Delete Experience
exports.deleteExp = catchAsyncErrors(async (req, res, next) => {
  const profil = await Profile.findOne({ doctor: req.user.id });
  // Get remove index

  const removeIndex = profil.experience
    .map((item) => item.id)
    .indexOf(req.params.id);

  profil.experience.splice(removeIndex, 1);
  await profil.save();

  const profile = await Profile.findOne({ doctor: req.user.id })
    .populate("doctor", "name phoneNumber avatar")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    });

  res.status(200).json({
    success: true,
    message: "Experience deleted successfully",
    profile,
  });
});

// Get All Reviews of a doctor profile
exports.getProfileReviews = catchAsyncErrors(async (req, res, next) => {
  // getting the profile and getting th name who gave review
  const profile = await Profile.findById(req.query.id).populate({
    path: "reviews",
    populate: {
      path: "user",
      model: "User",
      select: "name",
    },
  });

  if (!profile) {
    return next(new ErrorHander("Profile not found", 404));
  }
  profile.numOfReviews = profile.reviews.length;
  res.status(200).json({
    success: true,
    reviews: profile.reviews,
    numOfReviews: profile.numOfReviews,
  });
});

// Delete Review
exports.deleteProfileReview = catchAsyncErrors(async (req, res, next) => {
  const docProfile = await Profile.findById(req.query.profileId).populate(
    "doctor",
    "name phoneNumber avatar"
  );

  if (!docProfile) {
    return next(new ErrorHander("Profile not found", 404));
  }
  // first we ignore the review that we want to delete
  const reviews = docProfile.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  // pass only desired reviews and modfy the reviews
  const profile = await Profile.findByIdAndUpdate(
    req.query.profileId,
    {
      numOfReviews,
      reviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
    .populate("doctor", "name phoneNumber avatar")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name avatar",
      },
    });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    profile,
  });
});

//profiles -----stats---- get all profiles ---- admin
exports.getAllProfilesAdmin = catchAsyncErrors(async (req, res, next) => {
  const pending_profiles = await Profile.find({
    profileStatus: "pending",
  });
  let pending_requests = pending_profiles?.length;

  const profiles = await Profile.find({
    profileStatus: "accepted",
  }).populate("doctor", "name phoneNumber avatar");

  let avg_fee = 0;
  let rev = 0;
  let dr = {};
  let max = 1;
  profiles?.map((p) => {
    avg_fee += p.fees;
    rev = p.reviews.length;
    if (rev > max) {
      max = rev;
      dr.name = p.name;
      dr.reviews = rev;
      dr.id = p.id;
    }
  });
  let top_dr = dr;
  avg_fee = Math.round(avg_fee / profiles.length);

  res.status(201).json({
    success: true,
    avg_fee,
    top_dr,
    pending_requests,
  });
});
