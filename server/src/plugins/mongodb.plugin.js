import mongoose from "mongoose";

export const useMongoDB = (callback) => {
  mongoose
    .connect(process.env.DATABASE_CONNECTION_URL)
    .then(() => console.log("Database connection successful"))
    .then(() => {
      if (callback) callback();
    })
    .catch(() => console.log("Database connection fail"));
};
