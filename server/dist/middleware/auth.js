import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).json({ msg: "Access Denied" });
        }
        if (token.startsWith("Bearer")) {
            token = token.split(" ")[1];
        }
        const verified = jwt.verify(token, `${process.env.JWT_SECRET}`);
        req.user = verified;
        console.log(verified);
        next();
    }
    catch (error) {
        console.log(4);
        req.status(500).json({ error: error.message });
    }
};
