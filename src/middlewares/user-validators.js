import { body } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("El nombre de usuario es erroneo"),
    body("password").isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres"),
    validateFields,
    handleErrors
];

export const editPasswordValidator = [
    validateJWT,
    body("oldPassword").notEmpty().withMessage("The old password is required"),
    body("newPassword").notEmpty().withMessage("The new password is required"),
    body("newPassword").isStrongPassword({
        minLength: 8
    }).withMessage(`Password must be at least 8 characters long, 
        and contain at least one lowercase letter, one uppercase letter, 
        one number and one special character`),
    validateFields,
    handleErrors
]
