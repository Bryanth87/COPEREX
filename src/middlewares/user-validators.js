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
    body("oldPassword").notEmpty().withMessage("La anterior contraseña es requerida"),
    body("newPassword").notEmpty().withMessage("La nueva contraseña es requerida"),
    body("newPassword").isStrongPassword({
        minLength: 8
    }).withMessage(`La contraseña al menos debe de contener 8 carácteres`),
    validateFields,
    handleErrors
]
