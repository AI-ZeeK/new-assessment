import { prisma } from "../app.js";
export const createPost = async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        const author = await prisma.user.findUnique({
            where: {
                id: authorId,
            },
        });
        if (!author)
            return res.status(404).json("error");
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        });
        return res.status(201).json(post);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
export const getUserPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        return res.status(200).json(posts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        console.log(12345);
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });
        console.log(post, "ll", userId);
        if (!post)
            return res.status(404).json({ message: "No Post with id" });
        if (post.authorId !== userId) {
            return res.status(403).json({ mssage: "Forbidden" });
        }
        const deleted = await prisma.post.delete({
            where: {
                id,
            },
        });
        return res.status(201).json({ message: "Deleted" });
    }
    catch (error) {
        res.status(400).json({ msg: "Error Deleting" });
    }
};
