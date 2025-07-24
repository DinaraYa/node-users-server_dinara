import {createServer} from "node:http";
import {PORT} from "./config/userServerConfig.ts";
import {userRouters} from "./routers/userRouters.ts";
import {UserController} from "./controllers/UserController.ts";
import {UserServiceEmbeddedImpl} from "./service/UserServiceEmbeddedImpl.ts";
import {myLogger} from "./events/logger.ts";

export const launchServer = () => {
    const userService = new UserServiceEmbeddedImpl();
    const userController: UserController = new UserController(userService);
    createServer(async (req, res) => {
        await userRouters(req, res, userController)
    })
        .listen(PORT, () => {
            console.log(`UserServer runs at http://localhost:${PORT}`);
        })
    process.on('SIGINT', () => {
        myLogger.saveToFile("Server shutdown by Ctrl+C");
        process.exit();
    })
}