import { Router } from "express";
import { celebrate } from "celebrate";
import { pets } from "../controllers/index.js";

const petsRoute = Router();

petsRoute.get('/', pets.getPets);
petsRoute.get('/:petId', pets.getPetById);

export default petsRoute;
