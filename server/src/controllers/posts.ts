import {ReqRes} from "../interface.js";
import {prisma} from "../app.js";
import {Prisma} from "@prisma/client";

export const createPost: ReqRes = async (req, res) => {
  try {
    const {title, content, authorId}: any = req.body;
    const author = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });
    if (!author) return res.status(404).json("error");
    const post = await postService({
      title,
      content,
      authorId,
    });
    return res.status(201).json({...post, name: author.name});
  } catch (error: any) {
    res.status(409).json({message: error.message});
  }
};

const postService = (data: Prisma.PostUncheckedCreateInput) => {
  return prisma.post.create({data});
};

export const getUserPosts: ReqRes = async (req: any, res) => {
  try {
    const {id} = req.params;
    const authors = await prisma.user.findMany();
    const posts = await prisma.post.findMany();
    const updatedPosts = posts.map((post, index) => {
      const {name}: any = authors.find((author) => author.id === post.authorId);
      return {name, ...post};
    });
    return res.status(200).json(updatedPosts);
  } catch (error: any) {
    res.status(404).json({message: error.message});
  }
};

export const deletePost: ReqRes = async (req: any, res) => {
  const {id} = req.params;
  const userId = req.user.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) return res.status(404).json({message: "No Post with id"});

    if (post.authorId !== userId) {
      return res.status(403).json({mssage: "Forbidden"});
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
      const {name}: any = authors.find((author) => author.id === post.authorId);
      return {name, ...post};
    });
    return res.status(200).json(updatedPosts);
  } catch (error) {
    res.status(400).json({msg: "Error Deleting"});
  }
};
