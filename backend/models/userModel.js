const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//.....patient schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name"],
      minLength: [3, "Enter full name"],
      maxLength: [30, "Name length exceeds"],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z\s*]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid name`,
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Enter email address"],
      lowercase: true,
      validate: [validator.isEmail, "Enter valid email address"],
      isVarified: { type: Boolean, default: false },
    },
    password: {
      type: String,
      unique: true,
      select: false,
      required: [true, "Enter password"],
      validate: {
        validator: function (v) {
          var pwd =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
          return pwd.test(v);
        },
        message: (props) =>
          "Password must contain lowercase, uppercase, number <br> and special character and length 8-20.",
      },
    },
    phoneNumber: {
      type: Number,
      trim: true,
      required: [true, "Enter a valid phone number"],
      validate: {
        validator: function (v) {
          var no = /^(\+92|0|92)(3)[0-9]{9}$/;

          return no.test(v);
        },
        message: "Not a valid number",
      },
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "patient", "doctor"],
      default: "patient",
    },
  },
  {
    timestamps: true,
  }
);




//....encrypting the password before saving it to the database
userSchema.pre("save", async function (next) {
  //if pwd not modified then (this.password = await bcrypt.hash(this.password, 10)) will ignore
  if (!this.isModified("password")) {
    next();
  }
  //it will run for the first time and when the password change
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Compare Password
userSchema.methods.comparePassword = async function (password) {
  // this function compare the password store in db and the entered pswd by decrypting it
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
