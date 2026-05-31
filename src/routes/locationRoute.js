import { Router } from "express";

const locationRoute = new Router();

locationRoute.get('/', () => {});
locationRoute.get('/locations', () => {});

export default locationRoute;
