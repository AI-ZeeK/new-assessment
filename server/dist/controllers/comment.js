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
        const authors = await prisma.user.findMany();
        const updatedComments = comments.map((comment) => {
            const { name } = authors.find((author) => author.id === comment.commentorId);
            return Object.assign({ name }, comment);
        });
        return res.status(201).json(updatedComments);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
export const updatedComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        console.log(comment);
        const isComment = await prisma.comments.findUnique({
            where: { id },
        });
        if (!isComment)
            return res.status(404).json({ message: "Comment doesn't exist" });
        const updatedComments = await prisma.comments.update({
            where: {
                id,
            },
            data: {
                comment,
            },
        });
        const allComments = await prisma.comments.findMany();
        return res.status(201).json({ updatedComments, allComments });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await prisma.comments.findUnique({
            where: {
                id,
            },
        });
        if (!comment)
            return res.status(404).json({ message: "Comment doesn't exist" });
        const comments = await prisma.comments.delete({
            where: {
                id,
            },
        });
        const allComments = await prisma.comments.findMany();
        return res.status(201).json({ message: "Deleted", allComments });
    }
    catch (error) {
        res.status(400).json({ msg: "Error Deleting", error });
    }
};
