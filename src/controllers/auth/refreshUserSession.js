import createHttpError from "http-errors";
import { Session } from "../../models/session.js";
import { createSession, setSessionCookies } from "../../services/auth.js";

export const refreshUserSession = async(req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if(!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
if(isTokenExpired) {
  await Session.deleteOne({
    _id: sessionId,
    refreshToken,
  });
  throw createHttpError(401, 'Session token expired');
}

await Session.deleteOne({
  _id: sessionId,
  refreshToken,
});

const newSession = await createSession(session.userId);
setSessionCookies(res, newSession);

res.status(200).json({
  message: 'Session refreshed',
});
};
