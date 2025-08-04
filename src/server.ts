import express, {Request, Response, NextFunction} from 'express';
import {apiRouter} from "./routes/appRouter.js";
import {PORT} from "./config/userServerConfig.ts";
import {UserService} from "./service/UserService.ts";
import {UserServiceEmbeddedImpl} from "./service/UserServiceEmbeddedImpl.ts";
import {UserController} from "./controllers/UserController.ts";
import {myLogger} from "./events/logger.ts";
import {UserFilePersistenceService} from "./service/UserFilePersistenceService.ts";
import {HttpError} from "./errorHandler/HttpError.js";
import {PostServiceEmbeddedImpl} from "./service/PostServiceEmbeddedImpl.js";

export const service: UserService & UserFilePersistenceService = new UserServiceEmbeddedImpl();
export const userController = new UserController(service);
export const postService = new PostServiceEmbeddedImpl();



export const launchServer = () => {
    service.restoreDataFromFile()
    const app = express();
    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));


    // ========== Middleware ==============
    app.use(express.json()); // превращает readable stream в объект и прочитывает все
    //============ Router ===============
    app.use('/api', apiRouter);   // когда прилетают запросы в виде /api - используй apiRouter

    app.use((req , res) =>{
        res.status(400).send("Bad request");
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
       //  const error: {status: number, message: string} = JSON.parse(err.message);
        if (err instanceof HttpError)
        res.status(err.status).send(err.message);
        else
            res.status(500).send("Unknown server error");
    })


    process.on('SIGINT', async () => {
        await service.saveDataToFile();
        myLogger.log("Saving....")
        myLogger.saveToFile("Server shutdown by Ctrl+C");
        process.exit();
    })
}

