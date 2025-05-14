import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParse from "cookie-parser";
import rootRouter from "./routes/index.routes";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParse());

app.use("/api/v1/todo", rootRouter);

const PORT: string = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server is connected to DB: ${process.env.DATABASE_URL_DOCKER}`);
});
