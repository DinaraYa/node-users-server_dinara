import express, {Request, Response, NextFunction} from "express";
import {PostController} from "../controllers/PostController.ts";
import {PostServiceEmbeddedImpl} from "../service/PostServiceEmbeddedImpl.ts";
import {myLogger} from "../events/logger.ts";

const postService = new PostServiceEmbeddedImpl();
const postController = new PostController(postService);


export const postRouter = express.Router();

postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.log(`Request "api/posts${req.url}" was received`);
    next();
})
postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.save(`Request "api/posts${req.url}" was received`);
    next();
})

postRouter.get('/', async (req, res) => {
    if (req.query.id) {
        await postController.getPostById(req, res)
        return
    }
    if (req.query.userName) {
        await postController.getPostByUserName(req, res)
        return
    } else {
        await postController.getAllPosts(req, res);
        return
    }
})

postRouter.post('/', async (req, res) => {
    await postController.addPost(req, res);
})

postRouter.put('/', async (req: Request, res: Response) => {
    // const postDo = req.body ToDo
    const id = req.query.id
    if (id) {
        await postController.updatePost(req, res);
    }
})

postRouter.delete('/', async (req, res) => {
    const id = req.query.id
    if (id) {
        await postController.removePost(req, res);
    }
})


