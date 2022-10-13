const app = require("./app");

// loads environment variables from a .env file into process.env
require("dotenv").config();
const databaseConnection = require("./config/db");
//...Handling Uncaught Exception e.g(console.log(youtube)) it gives us undefined behaviour and uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//connect to database
databaseConnection();

//connection to serve
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//...Unhandled Promise Rejection database bcz we did not catch the promise in db.js
// for example we write the mongo uri incorrect
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
