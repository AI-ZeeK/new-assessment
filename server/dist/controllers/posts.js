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
        const post = await postService({
            title,
            content,
            authorId,
        });
        return res.status(201).json(Object.assign(Object.assign({}, post), { name: author.name }));
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
const postService = (data) => {
    return prisma.post.create({ data });
};
export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const authors = await prisma.user.findMany();
        const posts = await prisma.post.findMany();
        const updatedPosts = posts.map((post, index) => {
            const { name } = authors.find((author) => author.id === post.authorId);
            return Object.assign({ name }, post);
        });
        return res.status(200).json(updatedPosts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        });
        if (!post)
            return res.status(404).json({ message: "No Post with id" });
        if (post.authorId !== userId) {
            return res.status(403).json({ mssage: "Forbidden" });
        }
        await prisma.post.delete({
            where: {
                id,
            },
        });
        await prisma.comments.deleteMany({
            where: {
                postId: id,
            },
        });
        const posts = await prisma.post.findMany();
        const authors = await prisma.user.findMany();
        const updatedPosts = posts.map((post) => {
            const { name } = authors.find((author) => author.id === post.authorId);
            return Object.assign({ name }, post);
        });
        return res.status(200).json(updatedPosts);
    }
    catch (error) {
        res.status(400).json({ msg: "Error Deleting" });
    }
};
