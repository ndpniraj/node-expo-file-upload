import express from "express";

import "src/db";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
