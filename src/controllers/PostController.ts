import {postService, service} from "../server.ts";
import express, {Request, Response} from "express";
import {myLogger} from "../events/logger.ts";
import {Post} from "../model/postTypes.ts";
import {User} from "../model/userTypes.js";


export function addPost(req: express.Request, res: express.Response) {
    const post = req.body as Post;
    const result = postService.addPost(post);
    if (result) {
        res.send("Post was added")
        myLogger.save(`Post with id ${post.id} was successfully added.`)
        myLogger.log(`Response for add post with id ${post.id} was sent `);
    } else {
        res.send('Post already exists');
        myLogger.save(`Post with id ${post.id} already exists`);
        myLogger.log(`Post with id ${post.id} already exists`);
    }
}


export function getAllPosts(req: express.Request, res: express.Response) {
    res.json(postService.getAllPosts());
    myLogger.log(`Response for getting all users was sent`)
    myLogger.save(`All posts were successfully retrieved`)
}


export function getPostById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (!id) {
        res.status(400).send("Bad ID in request");
        myLogger.save(`Post with id ${id} was not found`);
        myLogger.log(`Post with id ${id} was not found`);
    }
    res.json(postService.getPostById(id));
    myLogger.save(`Post with id ${id} was successfully retrieved`)
    myLogger.log(`Response for retrieved post with id ${id} was sent`);
}


export function getPostByUserName(req: Request, res: Response) {
    const users = service.getAllUsers();
    const user = users.find((u: User) => u.userName === req.query.userName);
    if (!user) {
        res.status(404).send("User not found");
        myLogger.save(`Post with id ${user} was not found`);
        myLogger.log(`Post with id ${user} was not found`);
    } else {
        const result = postService.getAllUserPosts(user.id)
        myLogger.save(`Post with id ${user} was successfully retrieved`);
        myLogger.log(`Response for retrieved post with id ${user} was sent`);
        res.json(result);
    }
}

export function updatePost(req: express.Request, res: express.Response) {
    const post = req.body;
    const result = postService.updatePost(post);
    if (result) {
        res.send("Post successfully updated");
        myLogger.log(`Post with id ${post.id} was successfully was updated`);
        myLogger.save(`Post with id ${post.id} was successfully updated`);
    } else {
        res.status(404).send("Post not found");
        myLogger.log(`Post not found`);
        myLogger.save(`Post not found`);
    }
}


export function removePost(req: express.Request, res: express.Response) {
    const postId: number = parseInt(req.params.id);
    const post = postService.removePost(Number(postId));
    myLogger.save(`Post with id ${postId} was successfully removed.`)
    myLogger.log(`Response for  removed post with id ${postId} was sent`);
    res.json(post);
}

