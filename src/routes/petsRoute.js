import { Router } from "express";
import { celebrate } from "celebrate";
import { upload } from "../middleware/multer.js";
import { pets } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";
import { createOwnPetSchema, getPublicPetsSchema, petIdSchema } from "../validations/petsValidation.js";

const petsRoute = Router();

petsRoute.get('/', celebrate(getPublicPetsSchema), pets.getPets);
petsRoute.get('/random/:species', pets.getRandomPet);
petsRoute.post('/', authenticate, upload.single('avatar'), celebrate(createOwnPetSchema), pets.addOwnPet);
petsRoute.delete('/:petId', authenticate, celebrate(petIdSchema), pets.removeOwnPet);
petsRoute.get('/categories', pets.getPetsCategories);
petsRoute.get('/gender', pets.getPetsGender);
petsRoute.get('/species', pets.getPetsSpecies);

petsRoute.get('/:petId', authenticate, celebrate(petIdSchema), pets.getPetById);

export default petsRoute;
