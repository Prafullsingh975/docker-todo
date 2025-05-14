import { response, Response } from "express";
import { AuthencatedRequest } from "../middleware/auth";
import prisma from "../prisma";

export const createTodo = async (
  req: AuthencatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;

    const todo = await prisma.todo.create({
      data: { title, description, userId: +req.user.id },
    });
    res
      .status(201)
      .json({ suces: true, data: todo, message: "Todo created sucessfully" });
  } catch (error: any) {
    console.log("Error in creating todo", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};

export const updateTodo = async (
  req: AuthencatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const todo = await prisma.todo.update({
      where: { id: +id, userId: +req.user.id },
      data: { title, description },
    });

    if (!todo)
      res.status(404).json({ sucess: false, message: "Todo not found" });
    res
      .status(200)
      .json({ sucess: true, data: todo, message: "Todo updated sucessfully" });
  } catch (error: any) {
    console.log("Error in update todo", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};

export const toggleTodoStatus = async (
  req: AuthencatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const isExist = await prisma.todo.findUnique({
      where: { id: +id, userId: +req.user.id },
    });

    if (!isExist)
      res.status(404).json({ sucess: false, message: "Todo not found" });

    const todo = await prisma.todo.update({
      where: { id: +id, userId: +req.user.id },
      data: {
        isDone: !isExist?.isDone,
      },
    });

    res.status(200).json({
      sucess: true,
      data: todo,
      message: `Todo markes as ${todo.isDone ? "completed" : "incompleted"}`,
    });
  } catch (error: any) {
    console.log("Error in update todo status", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};

export const getTodos = async (
  req: AuthencatedRequest,
  res: Response
): Promise<void> => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: +req.user.id },
      orderBy: {
        createdAt: "desc", // or "asc" for oldest first
      },
    });

    res
      .status(200)
      .json({ sucess: true, data: todos, message: "Todos fetch sucessfully" });
  } catch (error: any) {
    console.log("Error in getting todos ", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};
