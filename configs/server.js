"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from 'morgan';
import { dbConnection } from "./mongo.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js"

const routes = (app) => {
    app.use("/coperex/v1/auth", authRoutes); 
    app.use("/coperex/v1/user", userRoutes)
};

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        const port = process.env.PORT || 3001;
        app.listen(port, () => {
            console.log(`Server running on port ${port} matutina`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};