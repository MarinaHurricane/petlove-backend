import { Router } from "express";
import { user } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";
import { getUserInfo } from "../controllers/user/getUserInfo.js";
import { upload } from "../middleware/multer.js";
import { celebrate } from "celebrate";
import { updateUserSchema } from "../validations/userValidation.js";
import { petIdSchema } from "../validations/petsValidation.js";
import { addViewedPet } from "../controllers/user/addViewedPet.js";

const userRoute = new Router();

userRoute.use(authenticate);

userRoute.get('/me', getUserInfo);
userRoute.patch('/me', celebrate(updateUserSchema), user.updateUser);
userRoute.patch('/me/avatar', upload.single('avatar'), user.updateUserAvatar);
userRoute.patch('/me/addViewed/:petId',celebrate(petIdSchema), user.addViewedPet);
userRoute.patch('/me/favorites/:petId', celebrate(petIdSchema), user.addPetToFavorites);
userRoute.delete('/me/:petId', celebrate(petIdSchema), user.removePetFromFavorites);




export default userRoute;
