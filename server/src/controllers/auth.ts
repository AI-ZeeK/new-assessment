import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {prisma} from "../app.js";
import {ReqRes} from "../interface.js";

export const login: ReqRes = async (req: any, res: any) => {
  console.log("sers");
  try {
    const {email, password} = req.body;
    const user: any = await prisma.user.findUnique({where: {email}});
    if (!user) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const name = email.split("@")[0];

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      });
      const token = jwt.sign({id: newUser.id}, <any>process.env.JWT_SECRET);

      delete user.password;
      return res.status(201).json({newUser, token});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({msg: "invalid Credentials"});
    }
    const token = jwt.sign({id: user.id}, <any>process.env.JWT_SECRET);

    delete user.password;
    res.status(200).json({user, token});
  } catch (error: any) {
    console.log(2, error.message);
    res.status(500).json({error: error.message});
  }
};
