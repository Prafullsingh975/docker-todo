import { Router } from "express";
import {
  profileDetail,
  registerUser,
  userLogin,
} from "../controllers/users.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/profile", auth, profileDetail);

export default router;
