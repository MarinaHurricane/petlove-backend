import { Router } from "express";
import { celebrate } from "celebrate";
import { pets } from "../controllers/index.js";

const petsRoute = Router();

petsRoute.get('/', pets.getPets);
petsRoute.get('/categories', pets.getPetsCategories);
petsRoute.get('/gender', pets.getPetsGender);
petsRoute.get('/species', pets.getPetsSpecies);
petsRoute.get('/:petId', pets.getPetById);

export default petsRoute;
