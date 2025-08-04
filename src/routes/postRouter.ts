import express, {Request, Response, NextFunction} from "express";
import {myLogger} from "../events/logger.ts";
import * as controller from '../controllers/PostController.ts'
import asyncHandler from "express-async-handler";
import {convertPostDto} from "../utils/tools.js";
import {Post} from "../model/postTypes.js";


export const postRouter = express.Router();

// postRouter.use((req: Request, res: Response, next: NextFunction) => {
//     myLogger.log(`Request "api/posts${req.url}" was received`);
//     next();
// })
// postRouter.use((req: Request, res: Response, next: NextFunction) => {
//     myLogger.save(`Request "api/posts${req.url}" was received`);
//     next();
// })

postRouter.get('/', async (req, res) => {
    if (req.query.userName) {
        controller.getPostByUserName(req, res)
        return
    } else {
        controller.getAllPosts(req, res);
        return
    }
})


postRouter.get('/post/:id', async (req:Request, res:Response) => {
    try {
        controller.getPostById(req, res)
    } catch (error) {
       res.status(400).send("Bad request");

    }
})

postRouter.post('/', async (req, res) => {
    controller.addPost(req, res);
})

postRouter.put('/', async (req: Request, res: Response) => {
    const postDo = req.body
    console.log(postDo)
    console.log(typeof postDo.id)
    const post: Post|null = convertPostDto(postDo);
    if(!post){
        return  res.status(400).send("Bad request");
    }
    req.body = post as Post;
    controller.updatePost(req, res);
})

postRouter.delete('/post/:id', async (req, res) => {
    const id = +req.params.id;
    console.log(id, typeof id)
    if (!id) {
       return  res.status(404).send("Bad request");
    }
    controller.removePost(req, res);
})

postRouter.get('/user', (req:Request, res:Response) => {
    const {userName} = req.query
    console.log(userName, typeof userName)
    if(!userName || typeof userName !== "string")
       return  res.status(400).send(`Bad request: userName required`)
    controller.getPostByUserName(req, res);
})

