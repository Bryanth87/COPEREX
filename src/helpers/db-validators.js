import User from "../user/user.model.js"

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El nombre de usuario ${username} ya está registrado`)
    }
}