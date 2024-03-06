import express from "express";
import {
  createUrl,
  deleteUrl,
  getAllUrls,
  getUrl,
} from "../controller/shortenUrl";

const router = express.Router();

router.post("/urlShorten", createUrl);
router.get("/urlShorten", getAllUrls);
router.get("/urlShorten/:id", getUrl);
router.delete("/urlShorten/:id", deleteUrl);

export default router;
