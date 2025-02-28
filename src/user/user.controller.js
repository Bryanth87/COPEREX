import User from "./user.model.js"
import {hash, verify} from "argon2"

export const editPassword = async (req, res) => {
    try {
        const { usuario } = req;
        const { newPassword } = req.body;

        const user = await User.findById(usuario._id);

        const oldPassword = user.password.toString()

        const matchOldAndNewPassword = await verify(oldPassword, newPassword);
        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La contraseña que ingresaste no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "contraseña actualizada",
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;

        const user = await User.findByIdAndUpdate(usuario._id,  data, { new: true });

        return res.status(200).json({
            message: "El usuario ha sido actualizado",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar usuario",
            error: err.message
        });
    }
}