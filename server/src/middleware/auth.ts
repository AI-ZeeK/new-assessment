import jwt from "jsonwebtoken";
import { ReqRes } from "../interface.js";

export const verifyToken: ReqRes = async (req: any, res, next: any) => {
	try {
		let token = req.header("Authorization");

		if (!token) {
			return res.status(403).json({ msg: "Access Denied" });
		}

		if (token.startsWith("Bearer")) {
			token = token.split(" ")[1];
		}

		const verified = jwt.verify(token, <any>process.env.JWT_SECRET);
		req.user = verified;

		next();
	} catch (error: any) {
		req.status(500).json({ error: error.message });
	}
};
