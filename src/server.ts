import express from 'express';
import {apiRouter} from "./routes/appRouter.js";
import {PORT} from "./config/userServerConfig.ts";
import {UserService} from "./service/UserService.ts";
import {UserServiceEmbeddedImpl} from "./service/UserServiceEmbeddedImpl.ts";
import {UserController} from "./controllers/UserController.ts";
import {myLogger} from "./events/logger.ts";
import {UserFilePersistenceService} from "./service/UserFilePersistenceService.ts";

export const service: UserService & UserFilePersistenceService = new UserServiceEmbeddedImpl();
export const userController = new UserController(service);


export const launchServer = () => {
    service.restoreDataFromFile()
    const app = express();
    app.use(express.json());
    app.use('/api', apiRouter);   // когда прилетают запросы в виде /api - используй apiRouter
    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));
    process.on('SIGINT', async () => {
        await service.saveDataToFile();
        myLogger.log("Saving....")
        myLogger.saveToFile("Server shutdown by Ctrl+C");
        process.exit();
    })
}

