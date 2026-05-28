import { Router } from "express";
import { auth } from "../controllers/index.js";
import { registerUserSchema } from "../validations/authValidation.js";
import { celebrate } from "celebrate";

const authRoute = new Router();

authRoute.post('/register', celebrate(registerUserSchema), auth.registerUser);

export default authRoute;
