"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const todos_routes_1 = __importDefault(require("./todos.routes"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/who-am-i", auth_1.whoami);
router.get("/logout", auth_1.logout);
router.use("/user", user_routes_1.default);
router.use("/todos", todos_routes_1.default);
exports.default = router;
