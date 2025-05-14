import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createTodo,
  getTodos,
  toggleTodoStatus,
  updateTodo,
} from "../controllers/todos.controller";

const router = Router();

router.post("/create", auth, createTodo);
router.put("/update/:id", auth, updateTodo);
router.patch("/toggle-status/:id", auth, toggleTodoStatus);
router.get("/all", auth, getTodos);

export default router;
