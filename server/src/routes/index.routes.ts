import { Router } from "express";
import userRouter from "./user.routes";
import todosRouter from "./todos.routes";
import { logout, whoami } from "../middleware/auth";

const router = Router();

router.get("/who-am-i", whoami);
router.get("/logout", logout);
router.use("/user", userRouter);
router.use("/todos", todosRouter);

export default router;
