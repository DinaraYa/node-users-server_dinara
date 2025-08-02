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
    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));


    // ========== Middleware ==============
    app.use(express.json()); // превращает readable stream в объект и прочитывает все
    //============ Router ===============
    app.use('/api', apiRouter);   // когда прилетают запросы в виде /api - используй apiRouter
    process.on('SIGINT', async () => {
        await service.saveDataToFile();
        myLogger.log("Saving....")
        myLogger.saveToFile("Server shutdown by Ctrl+C");
        process.exit();
    })
}

