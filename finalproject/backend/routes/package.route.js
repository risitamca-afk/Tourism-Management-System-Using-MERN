import express from "express";
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../controllers/package.controller.js";

const router = express.Router();

router.post("/", createPackage);
router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.put("/updatepackage/:id", updatePackage);
router.delete("/deletepackage/:id", deletePackage);

export default router;
