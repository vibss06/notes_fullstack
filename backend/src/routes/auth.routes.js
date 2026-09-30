import express from "express";

import {
  register,
  login,
  refreshToken,
  logout,
  getMe,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";

import { authentication } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/refresh-token", refreshToken);

router.post("/logout", authentication, logout);

router.get("/me", authentication, getMe);

export default router;
