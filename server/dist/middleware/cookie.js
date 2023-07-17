export const verifyUserCookie = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        console.log("çookies");
        if (!cookies.MyUser) {
            return res.status(400).json({ message: "Access denied" });
        }
        next();
    }
    catch (error) {
        req.status(500).json({ error: error.message });
    }
};
