import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { router } from "./routes/APIroutes";

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log("Connected to database");

  app.use("/cd", router);

  app.listen(3900, () => {
    console.log("Server is running on port 3900");
  });
});
