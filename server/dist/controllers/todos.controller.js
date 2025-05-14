"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.toggleTodoStatus = exports.updateTodo = exports.createTodo = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const todo = yield prisma_1.default.todo.create({
            data: { title, description, userId: +req.user.id },
        });
        res
            .status(201)
            .json({ suces: true, data: todo, message: "Todo created sucessfully" });
    }
    catch (error) {
        console.log("Error in creating todo", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const { id } = req.params;
        const todo = yield prisma_1.default.todo.update({
            where: { id: +id, userId: +req.user.id },
            data: { title, description },
        });
        if (!todo)
            res.status(404).json({ sucess: false, message: "Todo not found" });
        res
            .status(200)
            .json({ sucess: true, data: todo, message: "Todo updated sucessfully" });
    }
    catch (error) {
        console.log("Error in update todo", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.updateTodo = updateTodo;
const toggleTodoStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isExist = yield prisma_1.default.todo.findUnique({
            where: { id: +id, userId: +req.user.id },
        });
        if (!isExist)
            res.status(404).json({ sucess: false, message: "Todo not found" });
        const todo = yield prisma_1.default.todo.update({
            where: { id: +id, userId: +req.user.id },
            data: {
                isDone: !(isExist === null || isExist === void 0 ? void 0 : isExist.isDone),
            },
        });
        res.status(200).json({
            sucess: true,
            data: todo,
            message: `Todo markes as ${todo.isDone ? "completed" : "incompleted"}`,
        });
    }
    catch (error) {
        console.log("Error in update todo status", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.toggleTodoStatus = toggleTodoStatus;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield prisma_1.default.todo.findMany({
            where: { userId: +req.user.id },
            orderBy: {
                createdAt: "desc", // or "asc" for oldest first
            },
        });
        res
            .status(200)
            .json({ sucess: true, data: todos, message: "Todos fetch sucessfully" });
    }
    catch (error) {
        console.log("Error in getting todos ", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.getTodos = getTodos;
