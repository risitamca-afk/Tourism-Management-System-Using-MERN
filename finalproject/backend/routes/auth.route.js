import express from "express";
import {
  adminLogin,
  adminSignup,
  adminLogout,
  checkAuth,
  adminCheckAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { adminverifyToken } from "../middleware/adminVerifyToken.js";
const router = express.Router();
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/adminSignup", adminSignup);

router.post("/adminLogin", adminLogin);

router.get("/admin-check-auth", adminverifyToken, adminCheckAuth);

router.post("/adminLogout", adminLogout);




export default router;
