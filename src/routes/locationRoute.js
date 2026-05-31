import { Router } from "express";
import { location } from "../controllers/index.js";

const locationRoute = new Router();

locationRoute.get('/', location.getAllCities);
locationRoute.get('/locations', location.getPetsCities);

export default locationRoute;
