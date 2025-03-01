import { Router } from "express";
import { editPassword, editProfile } from "./user.controller.js";
import { editPasswordValidator } from "../middlewares/user-validators.js";

const router = Router();

router.patch(
    "/editPassword",
    editPasswordValidator,
    editPassword
)

router.put(
    "/editProfile", 
    editProfile
)

export default router;

