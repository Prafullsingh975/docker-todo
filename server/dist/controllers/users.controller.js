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
exports.profileDetail = exports.userLogin = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const constants_1 = require("../constants");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, email, password } = req.body;
        const isExist = yield prisma_1.default.user.findUnique({ where: { email } });
        if (isExist)
            res
                .status(409)
                .json({ sucess: false, message: "Email already register" });
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield prisma_1.default.user.create({
            data: { firstName, email, password: hash },
        });
        res
            .status(200)
            .json({ sucess: true, data: user, message: "User registed sucessfully" });
    }
    catch (error) {
        console.log("Error in user register", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.registerUser = registerUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            res.status(411).json({
                sucess: false,
                message: "Please provide email and passwoe=rd",
            });
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            res.status(401).json({ sucess: false, message: "Invalid credeintial" });
        else {
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                res.status(401).json({ sucess: false, message: "Invalid credential" });
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: email, name: user.firstName }, process.env.SECRET);
            res
                .cookie("accessToken", token, constants_1.cookieOption)
                .status(200)
                .json({ sucess: true, data: {}, message: "Login sucessfully" });
        }
    }
    catch (error) {
        console.log("Error in user login", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.userLogin = userLogin;
const profileDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: +req.user.id },
            select: { firstName: true, email: true },
        });
        if (!user)
            res.status(404).json({ sucess: false, message: "User not found" });
        res.status(200).json({ sucess: true, data: user, message: "User profile" });
    }
    catch (error) {
        console.log("Error in user login", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.profileDetail = profileDetail;
