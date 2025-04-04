import "reflect-metadata";
import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { router } from "./routes/APIroutes";

const app = express();
app.use(express.json()); // ✅ Ensure this is before the routes
app.use(cors());

AppDataSource.initialize().then(() => {
  console.log("Connected to database");

  app.use("/cd", router); // ✅ Now routes are defined after middleware

  app.listen(3900, () => {
    console.log("Server is running on port 3900");
  });
});
