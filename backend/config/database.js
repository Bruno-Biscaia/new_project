const mongoose = require("mongoose");

const connectDatabase = () => {
  const dbUri = 'mongodb://127.0.0.1:27017/MyDataBase';

  mongoose
    .connect(dbUri)
    .then(() => {
      console.log("Connected successfully to MongoDB");
    })
    .catch((err) => {
      console.error("Connection error:", err.message);
    });
};

module.exports = connectDatabase;
