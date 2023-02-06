import cors from "cors";
import express from "express";
import { config } from "@config/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(config.app.PORT, () =>
  console.log(`Listening on port: ${config.app.PORT}`)
);

export { app };
