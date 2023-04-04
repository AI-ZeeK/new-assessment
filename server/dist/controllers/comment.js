import { prisma } from "../app.js";
export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const commentorId = req.user.id;
        console.log(commentorId);
        if (!commentorId)
            return res.status(404).json({ message: "unauthorised" });
        console.log(456, postId);
        const post = await prisma.comments.create({
            data: {
                comment,
                commentorId,
                postId,
            },
        });
        console.log(789);
        res.status(201).json(post);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
export const getComments = async (req, res) => {
    try {
        const comments = await prisma.comments.findMany();
        res.status(201).json(comments);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
