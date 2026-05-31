import { Router } from "express";
import { friends } from "../controllers/index.js";

const friendsRoute = new Router();

friendsRoute.get('/', friends.getFriends);

export default friendsRoute;
