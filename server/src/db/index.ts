import mongoose from "mongoose";

const mongo_uri = "mongodb://localhost:27017/my_database_name";

mongoose
  .connect(mongo_uri)
  .then(() => console.log("db connected successfully!"))
  .catch((err) => console.log("Could not connect to db: ", err.message));
