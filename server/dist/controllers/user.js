import { prisma } from "../app.js";
export const updateProfilePicture = async (req, res) => {
    try {
        const { id } = req.params;
        const { profilePhoto } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            return res.status(400).json({ message: "Cannot continue request" });
        const updateProfilePhoto = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                profilePhoto,
            },
        });
        res.status(201).json(updateProfilePhoto);
    }
    catch (error) {
        res.status(409).json({ message: error });
    }
};
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            return res.status(400).json({ message: "Cannot continue request" });
        user.password = "You'll never guess my password";
        res.status(201).json(user);
    }
    catch (error) {
        res.status(409).json({ message: error });
    }
};
