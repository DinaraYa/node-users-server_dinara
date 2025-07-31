var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { apiRouter } from "./routes/appRouter.js";
import { PORT } from "./config/userServerConfig.js";
import { UserServiceEmbeddedImpl } from "./service/UserServiceEmbeddedImpl.js";
import { UserController } from "./controllers/UserController.js";
import { myLogger } from "./events/logger.js";
export const service = new UserServiceEmbeddedImpl();
export const userController = new UserController(service);
export const launchServer = () => {
    service.restoreDataFromFile();
    const app = express();
    app.use(express.json());
    app.use('/api', apiRouter); // когда прилетают запросы в виде /api - используй apiRouter
    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));
    process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
        yield service.saveDataToFile();
        myLogger.log("Saving....");
        myLogger.saveToFile("Server shutdown by Ctrl+C");
        process.exit();
    }));
};
