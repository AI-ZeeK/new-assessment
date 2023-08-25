import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {prisma} from "../app.js";
import {ReqRes} from "../interface.js";

export const login: ReqRes = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password)
      return res.status(400).json({message: "Input invalid"});
    const user: any = await prisma.user.findUnique({where: {email}});
    if (!user) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const name = email.split("@")[0];

      const newUser: any = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });
      const token = jwt.sign({id: newUser.id}, `${process.env.JWT_SECRET}`);

      delete newUser.password;
      res.cookie("MyUser", token, {maxAge: 3600000, httpOnly: true});

      return res.status(201).json({user: newUser, token});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: "invalid Credentials"});
    }

    const token = jwt.sign({id: user.id}, `${process.env.JWT_SECRET}`);
    res.cookie("MyUser", token, {maxAge: 3600000, httpOnly: true});
    delete user.password;
    res.status(200).json({user, token});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

export const updateBio: ReqRes = async (req, res) => {
  try {
    const {id} = req.params;
    const {bio} = req.body;
    const user = await prisma.user.findUnique({where: {id}});
    if (!user) return res.status(400).json({message: "User doesn't exist"});

    const newUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        bio,
      },
    });

    newUser.password === "You will never get it";
    res.status(200).json(newUser);
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
