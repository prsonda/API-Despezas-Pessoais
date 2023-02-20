import express from "express";
var cors = require("cors");
import { routes } from "./routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
