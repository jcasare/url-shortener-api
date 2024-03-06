import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import dbConnect from "./config/dbConfig";
const PORT = process.env.PORT || 4000;
const app = express();
import urlRoutes from "./routes/urlShortener";
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/", urlRoutes);
app.get("/", (req, res) => {
  res.send("Hello from URL shortener!");
});
app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is live on port ${PORT}....`);
});
