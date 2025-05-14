import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cookieOption } from "../constants";

export interface User {
  id: string;
  name: string;
  email: String;
}

export interface AuthencatedRequest extends Request {
  user: User;
}

export const auth = async (
  req: AuthencatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      res.status(403).json({ sucess: false, message: "Unauthorized" });
      return;
    }

    const decode = jwt.verify(token, process.env.SECRET as string);
    if (!decode) {
      res.status(403).json({ sucess: false, message: "Unauthorized" });
      return;
    }

    req.user = decode as User;
    next();
  } catch (error: any) {
    console.log("Error in user auth", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};

export const whoami = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      res.status(403).json({ sucess: false, message: "Unauthorized" });
      return;
    }

    const decode = jwt.verify(token, process.env.SECRET as string);
    if (!decode) {
      res.status(403).json({ sucess: false, message: "Unauthorized" });
      return;
    }

    res.status(200).json({
      sucess: true,
      data: decode,
      message: "All Good :)",
    });
  } catch (error: any) {
    console.log("Error in user auth", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    res
      .clearCookie("accessToken", cookieOption)
      .status(200)
      .json({ success: true, message: "User logged out" });
  } catch (error: any) {
    console.log("Error in user logout", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};
