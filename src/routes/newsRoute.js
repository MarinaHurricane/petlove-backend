import { Router } from "express";
import { news } from "../controllers/index.js";

const newsRoute = new Router();

newsRoute.get('/', news.getNews);

export default newsRoute;
