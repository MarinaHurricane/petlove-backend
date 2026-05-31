import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";

export const authenticate = async(req, res, next) => {
  const { accessToken } = req.cookies;
  console.log(accessToken);
  if(!accessToken) {
    throw createHttpError(401, 'Missing access token');
  };
   const session = await Session.findOne({accessToken});
   if(!session) {
    throw createHttpError(401, 'Session nopt found');
   }

   const isTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
   if(isTokenExpired) {
    throw createHttpError(401, 'Access token expired');
   };

   const user = await User.findById(session.userId);
   if(!user) {
    throw createHttpError(401);
   }

   req.user = user;
   next();
};
