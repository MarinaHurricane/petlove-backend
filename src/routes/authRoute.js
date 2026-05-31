import { Router } from "express";
import { auth } from "../controllers/index.js";
import { registerUserSchema, loginUserSchema } from "../validations/authValidation.js";
import { celebrate } from "celebrate";

const authRoute = new Router();

authRoute.post('/register', celebrate(registerUserSchema), auth.registerUser);
authRoute.post('/login', celebrate(loginUserSchema), auth.loginUser);
authRoute.post('/logout', auth.logoutUser);

export default authRoute;
