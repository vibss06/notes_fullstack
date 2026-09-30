import express from "express";
import cookieParser from "cookie-parser";

import notesRoute from "../routes/notes.routes.js";
import authRoutes from "../routes/auth.routes.js";
import connectdb from "../config/db.js";

const app = express();



app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hi friend");
});

app.use("/notes", notesRoute);
app.use("/api/auth", authRoutes);

export default app;
