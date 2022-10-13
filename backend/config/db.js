const mongoose = require("mongoose");

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb is connected with server ${data.connection.host}`);
    });
};

module.exports = databaseConnection;
