import express from "express";
import {myLogger} from "../events/logger.js";


export const loggerRouter = express.Router();

loggerRouter.get('/', async (req, res) => {
    try {
        const result =  myLogger.getLogArray();
        res.status(200).json(result);
    } catch (error) {
        console.log("Failed to write log file: ", error);
    }


})