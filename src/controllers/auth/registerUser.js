import { User } from "../../models/user.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from "../../services/auth.js";

export const registerUser = async(req, res) => {
  const {name, email, password} = req.body;
  console.log(name);

  const existingUser = await User.findOne({email});
  if(existingUser) {
    throw createHttpError(400, 'Email in use');
  };

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name: name,
    email,
    password: hashedPassword,
  });
  console.log(newUser);

  const newSession = await createSession(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

