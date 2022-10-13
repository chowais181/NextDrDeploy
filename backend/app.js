const express = require("express");
//we have to store the token in cookie
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// CORS defines a way in which a browser and server can
// interact to determine whether it is safe to allow the cross-origin request
// it is more secure than simply allowing the cross-origin request
const cors = require("cors");
const app = express();

//.....middleware functions
app.use(express.json());
//for decode the value of the cookie
app.use(cookieParser());
// parse application/x-www-form-urlencoded
//Returns middleware that only parses urlencoded bodies and
//only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static("backend/public"));
// .....Routes imports

const user = require("./routes/userRoute");
const profile = require("./routes/profileRoute");
const appointment = require("./routes/appointmentRoute");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/.env" });
}

app.use("/api/v1", user);
app.use("/api/v1", profile);
app.use("/api/v1", appointment);

// if (process.env.NODE_ENV === "production") {
app.use("/", express.static("../client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
//   }

// ..error middleware we handle the error through it so over server would not stop
const errormiddleware = require("./middleware/error");
app.use(errormiddleware);
//....exporting app
module.exports = app;
