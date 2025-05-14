import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { cookieOption } from "../constants";
import { AuthencatedRequest } from "../middleware/auth";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, email, password } = req.body;
    const isExist = await prisma.user.findUnique({ where: { email } });
    if (isExist)
      res
        .status(409)
        .json({ sucess: false, message: "Email already register" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { firstName, email, password: hash },
    });

    res
      .status(200)
      .json({ sucess: true, data: user, message: "User registed sucessfully" });
  } catch (error: any) {
    console.log("Error in user register", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(411).json({
        sucess: false,
        message: "Please provide email and passwoe=rd",
      });

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      res.status(401).json({ sucess: false, message: "Invalid credeintial" });
    else {
      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch)
        res.status(401).json({ sucess: false, message: "Invalid credential" });
      const token = jwt.sign(
        { id: user.id, email: email, name: user.firstName },
        process.env.SECRET as string
      );

      res
        .cookie("accessToken", token, cookieOption)
        .status(200)
        .json({ sucess: true, data: {}, message: "Login sucessfully" });
    }
  } catch (error: any) {
    console.log("Error in user login", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};

export const profileDetail = async (
  req: AuthencatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: +req.user.id },
      select: { firstName: true, email: true },
    });
    if (!user)
      res.status(404).json({ sucess: false, message: "User not found" });

    res.status(200).json({ sucess: true, data: user, message: "User profile" });
  } catch (error: any) {
    console.log("Error in user login", error);
    res.status(500).json({
      sucess: false,
      message: error?.message || "Somthing went wrong",
      error,
    });
  }
};
