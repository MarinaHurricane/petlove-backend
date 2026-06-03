import { Router } from "express";
import { user } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";
import { getUserInfo } from "../controllers/user/getUserInfo.js";
import { upload } from "../middleware/multer.js";

const userRoute = new Router();

userRoute.use(authenticate);

userRoute.get('/me', getUserInfo);
userRoute.patch('/me/avatar', upload.single('avatar'), user.updateUserAvatar);
userRoute.patch('/me/add/my-pet', user.addOwnPet);
userRoute.patch('/me/remove/my-pet/:petId', user.removeOwnPet);
userRoute.patch('/me/add/:petId', user.addPetToFavorites);
userRoute.patch('/me/remove/:petId', user.removePetFromFavorites);


export default userRoute;
