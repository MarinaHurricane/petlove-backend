import { Router } from "express";
import { auth } from "../controllers/index.js";
import { registerUserSchema, loginUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validations/authValidation.js";
import { celebrate } from "celebrate";
import { refreshUserSession } from "../controllers/auth/refreshUserSession.js";
import { resetPassword } from "../controllers/auth/resetPassword.js";

const authRoute = new Router();

authRoute.post('/register', celebrate(registerUserSchema), auth.registerUser);
authRoute.post('/login', celebrate(loginUserSchema), auth.loginUser);
authRoute.post('/logout', auth.logoutUser);
authRoute.post('/refresh', refreshUserSession);
authRoute.post('/request-reset-password', celebrate(requestResetEmailSchema), auth.requestResetEmail);
authRoute.post('/reset-password', celebrate(resetPasswordSchema), resetPassword);

export default authRoute;
