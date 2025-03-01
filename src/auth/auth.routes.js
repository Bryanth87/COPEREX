import { Router } from "express";
import { loginValidator } from "../middlewares/user-validators.js";
import { login } from "./auth.controller.js";

const router = Router();

router.post(
    "/login",
    loginValidator,
    login
);

export default router;
