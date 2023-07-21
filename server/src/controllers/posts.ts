import {ReqRes} from "../interface.js";
import {prisma} from "../app.js";
import {Prisma} from "@prisma/client";

export const createPost: ReqRes = async (req, res) => {
  try {
    const {image, content, authorId}: any = req.body;
    const author = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!author) return res.status(404).json("error");

    if (image !== null) {
      await postService({
        image,
        content,
        authorId,
      });

      const allPosts = await PostAuthors();
      return res.status(201).json(allPosts);
    }

    await postService({
      content,
      authorId,
    });
    const allPosts = await PostAuthors();
    res.status(201).json(allPosts);
  } catch (error: any) {
    res.status(409).json({message: error.message});
  }
};

const postService = async (data: Prisma.PostUncheckedCreateInput) => {
  return prisma.post.create({data});
};

export const getPosts: ReqRes = async (req: any, res) => {
  try {
    const updatedPosts = await PostAuthors();

    return res.status(200).json(updatedPosts);
  } catch (error: any) {
    res.status(404).json({message: error.message});
  }
};
export const getUserPosts: ReqRes = async (req: any, res) => {
  try {
    const {authorId} = req.params;
    const authors = await prisma.user.findMany();
    const posts = await prisma.post.findMany({
      where: {authorId},
    });
    const updatedPosts = await Promise.all(
      posts.map((post, index) => {
        const {name, profilePhoto, id}: any = authors.find(
          (author) => author.id === post.authorId
        );
        return {name, profilePhoto, ...post, userId: id};
      })
    );
    return res.status(200).json(updatedPosts);
  } catch (error: any) {
    res.status(404).json({message: error.message});
  }
};
export const getPost: ReqRes = async (req: any, res) => {
  try {
    const {id} = req.params;
    if (!id) return res.status(404).json({message: "problem with request"});
    const post: any = await prisma.post.findUnique({
      where: {id},
    });
    if (!post)
      return res.status(404).json({message: "Requested post doesn't exist"});
    const {
      name,
      profilePhoto,
      id: userId,
    }: any = await prisma.user.findUnique({
      where: {
        id: post.authorId,
      },
    });
    const updatedPost = {name, profilePhoto, ...post, userId};
    return res.status(200).json(updatedPost);
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
      return res.status(403).json({message: "Forbidden"});
    }

    await Promise.all([
      prisma.post.delete({
        where: {
          id,
        },
      }),
      prisma.comments.deleteMany({
        where: {
          postId: id,
        },
      }),
    ]);

    const updatedPosts = await PostAuthors();

    return res.status(200).json(updatedPosts);
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};

export const Like: ReqRes = async (req, res) => {
  try {
    const {postId, userId} = req.params;
    if (!postId || !userId)
      return res.status(400).json({message: "Problem with request"});
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return res.status(400).json({message: "User doesn't exist"});
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) return res.status(400).json({message: "Post doesn't exist"});
    if (user.id === post.authorId) {
      const isLiked = post.postlikes.find((likeId: string) => {
        return likeId === user.id;
      });
      if (!isLiked) {
        post.postlikes.push(user.id);
        post.authorLike = true;
      }
      if (isLiked) {
        post.postlikes = post.postlikes.filter((likeId) => likeId !== user.id);
        post.authorLike = false;
      }
      await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          postlikes: post.postlikes,
          authorLike: post.authorLike,
        },
      });
    }
    if (user.id !== post.authorId) {
      const isLiked = post.postlikes.find((likeId: string) => {
        return likeId === user.id;
      });
      if (!isLiked) {
        post.postlikes.push(user.id);
      }
      if (isLiked) {
        post.postlikes = post.postlikes.filter((likeId) => likeId !== user.id);
      }
      await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          postlikes: post.postlikes,
        },
      });
    }

    const allPosts = await PostAuthors();
    res.status(201).json(allPosts);
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};

const PostAuthors = async () => {
  const [authors, posts] = await Promise.all([
    prisma.user.findMany(),
    prisma.post.findMany(),
  ]);

  const updatedPosts = await Promise.all(
    posts.map((post) => {
      const {name, profilePhoto, id}: any = authors.find(
        (author) => author.id === post.authorId
      );
      return {name, profilePhoto, ...post, userId: id};
    })
  );
  return updatedPosts;
};
