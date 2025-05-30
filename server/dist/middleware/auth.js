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
exports.logout = exports.whoami = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            res.status(403).json({ sucess: false, message: "Unauthorized" });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        if (!decode) {
            res.status(403).json({ sucess: false, message: "Unauthorized" });
            return;
        }
        req.user = decode;
        next();
    }
    catch (error) {
        console.log("Error in user auth", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.auth = auth;
const whoami = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            res.status(403).json({ sucess: false, message: "Unauthorized" });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        if (!decode) {
            res.status(403).json({ sucess: false, message: "Unauthorized" });
            return;
        }
        res.status(200).json({
            sucess: true,
            data: decode,
            message: "All Good :)",
        });
    }
    catch (error) {
        console.log("Error in user auth", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.whoami = whoami;
const logout = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .clearCookie("accessToken", constants_1.cookieOption)
            .status(200)
            .json({ success: true, message: "User logged out" });
    }
    catch (error) {
        console.log("Error in user logout", error);
        res.status(500).json({
            sucess: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Somthing went wrong",
            error,
        });
    }
});
exports.logout = logout;
