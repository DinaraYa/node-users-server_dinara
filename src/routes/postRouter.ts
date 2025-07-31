import express from "express";
import {PostController} from "../controllers/PostController.ts";
import {PostServiceEmbeddedImpl} from "../service/PostServiceEmbeddedImpl.ts";

const postService = new PostServiceEmbeddedImpl();
const postController = new PostController(postService);


export const postRouter = express.Router();


postRouter.get('/', async (req, res) => {
    if (req.query.id) {
        await postController.getPostById(req, res)
        return
    } if (req.query.userName) {
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

postRouter.put('/', async (req, res) => {
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


