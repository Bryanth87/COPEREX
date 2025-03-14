import User from "../user/user.model.js";
import argon2 from "argon2"; 

const createDefaultAdmin = async () => {
    try {
        const admin = await User.findOne({ role: "ADMIN_ROLE" });
        if (!admin) {
            const hashedPassword = await argon2.hash("Brayan1234"); 

            const defaultAdmin = new User({
                name: "Bryan",
                surname: "Bryanth87",
                email: "Bryanth87@gmail.com",
                password: hashedPassword, 
                phone: "12345678",
                role: "ADMIN_ROLE",
                status: true
            });

            await defaultAdmin.save();
            console.log("Administrador por defecto creado:", defaultAdmin);
        } else {
            console.log("Ya existe un admin en la base de datos");
        }
    } catch (error) {
        console.error("Error al crear el admin", error);
    }
};

export default createDefaultAdmin; 