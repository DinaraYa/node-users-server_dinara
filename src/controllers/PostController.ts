import {postService, service} from "../server.ts";
import express, {Request, Response} from "express";
import {myLogger} from "../events/logger.ts";
import {Post} from "../model/postTypes.ts";
import {User} from "../model/userTypes.js";
import {users} from "../service/UserServiceEmbeddedImpl.js";


export function addPost(req: express.Request, res: express.Response) {
    const post = req.body as Post;
    console.log(typeof post.id)

    const isSuccess = postService.addPost(post);
    if (isSuccess) {
        myLogger.save(`Post with id ${post.id} was successfully added.`)
        res.writeHead(201, {'Content-Type': 'text/html'});
        res.end('Post was added');
        myLogger.log(`Response for add post with id ${post.id} was sent `);
        return;
    } else {
        res.writeHead(409, {'Content-Type': 'text/html'})
        res.end('Post already exists');
        myLogger.save(`Post with id ${post.id} already exists`);
        myLogger.log(`Post with id ${post.id} already exists`);
        return;
    }
}


export function getAllPosts(req: express.Request, res: express.Response) {

    res.json(postService.getAllPosts());

}


export function getPostById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (id !== null) {
        const post = postService.getPostById(Number(id));
        if (post) {
            myLogger.save(`Post with id ${id} was successfully retrieved`);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(post));
            myLogger.log(`Response for retrieved post with id ${id} was sent`);
            return;
        } else {
            res.writeHead(404, {"Content-Type": "text/plain"})
            res.end("Post not found");
            myLogger.save(`Post with id ${id} was not found`);
            myLogger.log(`Post with id ${id} was not found`);
            return;
        }
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.end("Missing id parameter");
        return;
    }
}


export function getPostByUserName(req: Request, res: Response) {
    const users = service.getAllUsers();

    const user = users.find((u:User) => u.userName === req.query.userName);
    if(!user)
        res.status(404).send("User not found");
    else {
        const result = postService.getAllUserPosts(user.id)
        res.json(result);
    }
}

export function updatePost(req: express.Request, res: express.Response) {
    const post = req.body;

    if (!service.getUser(post.userId)) {
        return res.status(404).send("User not found");
    }
    const result = postService.updatePost(post);
    if (result) {
       return  res.send("Post successfully updated")
    }

    else {
        return res.status(404).send("Post not found")
    }
}



export function removePost(req: express.Request, res: express.Response) {
    const postId: number = parseInt(req.params.id);

    try {
        const post = postService.removePost(Number(postId));
        res.json(post);
        return;
    } catch (e) {
        res.status(404).send(e);
        return;
    }
}

