var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { PostController } from "../controllers/PostController.js";
import { PostServiceEmbeddedImpl } from "../service/PostServiceEmbeddedImpl.js";
import { myLogger } from "../events/logger.js";
const postService = new PostServiceEmbeddedImpl();
const postController = new PostController(postService);
export const postRouter = express.Router();
postRouter.use((req, res, next) => {
    myLogger.log(`Request "api/posts${req.url}" was received`);
    next();
});
postRouter.use((req, res, next) => {
    myLogger.save(`Request "api/posts${req.url}" was received`);
    next();
});
postRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.id) {
        yield postController.getPostById(req, res);
        return;
    }
    if (req.query.userName) {
        yield postController.getPostByUserName(req, res);
        return;
    }
    else {
        yield postController.getAllPosts(req, res);
        return;
    }
}));
postRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postController.addPost(req, res);
}));
postRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (id) {
        yield postController.updatePost(req, res);
    }
}));
postRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (id) {
        yield postController.removePost(req, res);
    }
}));
