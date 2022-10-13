const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctorProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientName: {
      type: String,
      required: true,
      required: [true, "Enter patient name"],
    },
    fatherName: {
      type: String,
      required: [true, "Enter father name "],
    },
    age: {
      type: Number,
      required: [true, "Enter age"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    bookingTime: {
      type: String,
      required: [true, "Enter time"],
    },
    bookingDate: {
      type: Date,
      required: [true, "Enter Data"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
