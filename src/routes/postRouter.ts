import express, {Request, Response, NextFunction} from "express";
import {myLogger} from "../events/logger.ts";
import * as controller from '../controllers/PostController.ts'
import asyncHandler from "express-async-handler";
import {convertPostDto} from "../utils/tools.js";
import {Post} from "../model/postTypes.js";
import {PostDtoSchema} from "../joiSchemas/postSchemas.js";
import {HttpError} from "../errorHandler/HttpError.js";


export const postRouter = express.Router();

postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.log(`Request "api/posts${req.url}" was received`);
    next();
})
postRouter.use((req: Request, res: Response, next: NextFunction) => {
    myLogger.save(`Request "api/posts${req.url}" was received`);
    next();
})




postRouter.get('/', asyncHandler(async (req:Request, res:Response) => {
        controller.getAllPosts(req, res);
}))

postRouter.get('/post/:id', asyncHandler(async (req:Request, res:Response) => {
        const {id} = req.params;
        if (!id) throw new HttpError(404,"Post not found");
        controller.getPostById(req, res)
}))

postRouter.post('/', asyncHandler(async (req:Request, res:Response):Promise<void>=> {
    const postDto: Post = req.body;
    const {error} = PostDtoSchema.validate(postDto);
    if (error) throw new HttpError(400, error.message)
    const post: Post| null = convertPostDto(postDto);
    if(!post) throw new Error ("Bad request");
    req.body = post as Post;
    controller.addPost(req, res);
}))

postRouter.put('/', asyncHandler(async (req: Request, res: Response):Promise<void> => {
    const postDto: Post = req.body;
    const {error} = PostDtoSchema.validate(postDto);
    if (error) throw new HttpError(400, error.message)
    const post: Post|null = convertPostDto(postDto);
    if(!post) throw new Error ("Bad request");
    req.body = post as Post;
    controller.updatePost(req, res);
}))

postRouter.delete('/post/:id', asyncHandler(async (req:Request, res:Response):Promise<void> => {
    const id = +req.params.id;
    if (!id) throw new HttpError(404,"Post not found");
    controller.removePost(req, res);
}))

postRouter.get('/user', asyncHandler(async (req:Request, res:Response) => {
    const {userName} = req.query
    if(!userName || typeof userName !== "string") throw new HttpError(400, "Bad request: userName required")
    controller.getPostByUserName(req, res);
}))

