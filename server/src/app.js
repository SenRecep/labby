import * as dotenv from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { useRoute,usRoute } from "./route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(json());
useRoute(app);
usRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");

     mongoose
       .connect(process.env.DATABASE_CONNECTION_URL)
       .then(() => console.log("Database connection successful"))
       .catch(() => console.log("Database connection fail"));
  console.log(`url: http://localhost:${PORT}`);
});
