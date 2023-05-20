import { prisma } from "../app.js";
export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const commentorId = req.user.id;
        if (!commentorId)
            return res.status(404).json({ message: "unauthorised" });
        const post = await prisma.comments.create({
            data: {
                comment,
                commentorId,
                postId,
            },
        });
        return res.status(201).json(post);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
export const getComments = async (req, res) => {
    try {
        const comments = await prisma.comments.findMany();
        return res.status(201).json(comments);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
