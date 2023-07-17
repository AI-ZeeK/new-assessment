import {ReqRes} from "../interface.js";
import {prisma} from "../app.js";

export const AddOrRemoveFriendRequest: ReqRes = async (req, res) => {
  try {
    const {friendId, userId} = req.params;
    if (!friendId || !userId)
      return res.status(400).json({message: "Problem with request"});
    if (friendId === userId)
      return res.status(400).json({message: "Can't send yourself request"});
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(400).json({message: "User doesn't exist"});
    const friend = await prisma.user.findUnique({
      where: {
        id: friendId,
      },
    });
    if (!friend) return res.status(400).json({message: "Friend doesn't exist"});
    const isFriend = friend.friends.find((friendId: string) => {
      return friendId === user.id;
    });

    if (!isFriend) {
      const isReceivedFriendRequest = await prisma.friendRequest.findMany({
        where: {
          userId: user.id,
          friendId: friendId,
          sender: false,
        },
      });

      if (isReceivedFriendRequest.length) {
        user.friends.push(friend.id);
        friend.friends.push(user.id);
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            friends: user.friends,
          },
        });
        await prisma.user.update({
          where: {
            id: friend.id,
          },
          data: {
            friends: friend.friends,
          },
        });
        await prisma.friendRequest.deleteMany({
          where: {
            userId: user.id,
            friendId: friend.id,
          },
        });
        await prisma.friendRequest.deleteMany({
          where: {
            userId: friend.id,
            friendId: user.id,
          },
        });
        const allRequests = await prisma.friendRequest.findMany({
          where: {
            userId: user.id,
          },
        });

        res.status(201).json(allRequests);
      }
      const isSentFriendRequest = await prisma.friendRequest.findMany({
        where: {
          userId: user.id,
          friendId: friendId,
          sender: true,
        },
      });
      if (isSentFriendRequest.length)
        return res.status(400).json({message: `Already sent friend request`});
      await prisma.friendRequest.create({
        data: {
          userId: user.id,
          friendId: friend.id,
          sender: true,
        },
      });
      await prisma.friendRequest.create({
        data: {
          userId: friend.id,
          friendId: user.id,
          sender: false,
        },
      });
    }

    if (isFriend) {
      const newUserFriends = user.friends.filter((friendId) => {
        return friendId !== friend.id;
      });
      const newFriendFriends = friend.friends.filter((friendId) => {
        return friendId !== user.id;
      });
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          friends: newUserFriends,
        },
      });
      await prisma.user.update({
        where: {
          id: friend.id,
        },
        data: {
          friends: newFriendFriends,
        },
      });
    }

    const allRequests = await prisma.friendRequest.findMany({
      where: {
        userId: user.id,
        sender: true,
      },
    });
    const authors = await prisma.user.findMany();
    const myRequests = allRequests.map((requests) => {
      const {name, profilePhoto}: any = authors.find(
        (author) => author.id === requests.friendId
      );
      return {...requests, name, profilePhoto};
    });

    res.status(201).json(myRequests);
  } catch (error: any) {
    res.status(400).json({message: error.message});
  }
};

export const AcceptFriendRequest: ReqRes = async (req, res) => {
  try {
    const {requestId} = req.params;
    const {requestState}: {requestState: boolean} = req.body;
    console.log(requestState, typeof requestState);
    if (!requestId)
      return res.status(400).json({message: "Problem with request"});
    const request = await prisma.friendRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) return res.status(400).json({message: "request not found"});
    const user = await prisma.user.findUnique({
      where: {
        id: request.userId,
      },
    });

    if (!user) return res.status(400).json({message: "User doesn't exist"});
    const friend = await prisma.user.findUnique({
      where: {
        id: request.friendId,
      },
    });
    if (!friend) return res.status(400).json({message: "Friend doesn't exist"});
    if (!requestState) {
      await prisma.friendRequest.deleteMany({
        where: {
          userId: user.id,
          friendId: friend.id,
        },
      });
      await prisma.friendRequest.deleteMany({
        where: {
          userId: friend.id,
          friendId: user.id,
        },
      });
    }
    if (requestState) {
      console.log(1);
      user.friends.push(friend.id);
      friend.friends.push(user.id);
      console.log(2);
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          friends: user.friends,
        },
      });
      console.log(3);
      await prisma.user.update({
        where: {
          id: friend.id,
        },
        data: {
          friends: friend.friends,
        },
      });
      console.log(4);
      await prisma.friendRequest.deleteMany({
        where: {
          userId: user.id,
          friendId: friend.id,
        },
      });
      console.log(5);
      await prisma.friendRequest.deleteMany({
        where: {
          userId: friend.id,
          friendId: user.id,
        },
      });
      console.log(6);
    }
    const allRequests = await prisma.friendRequest.findMany({
      where: {
        userId: user.id,
      },
    });

    res.status(201).json(allRequests);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({message: error.message});
  }
};

export const userFriendRequests: ReqRes = async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(400).json({message: "User doesn't exist"});
    user.password = "Can't catch this";

    const isMyFriendRequests = await prisma.friendRequest.findMany({
      where: {
        userId: user.id,
        sender: false,
      },
    });

    if (!isMyFriendRequests.length) {
      return res.status(201).json(isMyFriendRequests);
    }
    const authors = await prisma.user.findMany();
    const myRequests = isMyFriendRequests.map((requests) => {
      const {name, profilePhoto}: any = authors.find(
        (author) => author.id === requests.friendId
      );
      return {...requests, name, profilePhoto};
    });

    res.status(201).json(myRequests);
  } catch (error: any) {
    res.status(409).json({message: error.message});
  }
};

export const sentFriendRequests: ReqRes = async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(400).json({message: "User doesn't exist"});
    user.password = "Can't catch this";

    const isMyFriendRequests = await prisma.friendRequest.findMany({
      where: {
        userId: user.id,
        sender: true,
      },
    });

    if (!isMyFriendRequests.length) {
      return res.status(201).json(isMyFriendRequests);
    }
    const authors = await prisma.user.findMany();
    const myRequests = isMyFriendRequests.map((requests) => {
      const {name, profilePhoto}: any = authors.find(
        (author) => author.id === requests.friendId
      );
      return {...requests, name, profilePhoto};
    });

    res.status(201).json(myRequests);
  } catch (error: any) {
    res.status(409).json({message: error.message});
  }
};

export const FriendsPosts: ReqRes = async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(400).json({message: "User doesn't exist"});

    const myFriends: any = await Promise.all(
      user.friends.map(async (friend) => {
        const fr = await prisma.user.findUnique({
          where: {
            id: friend,
          },
        });

        if (fr) {
          fr.password = "YOU SHALL NOT PASS";
        }
        if (!fr) return res.status(404).json({message: `User doesn't exist`});
        const posts = await prisma.post.findMany({
          where: {authorId: fr.id},
        });
        const friendsPosts = posts.map((post) => {
          return {...post, name: fr.name, profilePhoto: fr.profilePhoto};
        });

        return {
          name: fr.name,
          id: fr.id,
          profilePhoto: fr.profilePhoto,
          posts: [...friendsPosts],
        };
      })
    );
    res.status(201).json(myFriends);
  } catch (error: any) {
    res.status(409).json({message: error.message});
  }
};
