import jwt from "jsonwebtoken";
import {ReqRes} from "../interface.js";

export const verifyUserCookie: ReqRes = async (req: any, res, next: any) => {
  try {
    const cookies = req.cookies;
    console.log("çookies");
    if (!cookies.MyUser) {
      return res.status(400).json({message: "Access denied"});
    }
    next();
  } catch (error: any) {
    req.status(500).json({error: error.message});
  }
};
