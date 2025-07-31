import {PostService} from "../service/PostService.ts";
import express from "express";
import {myLogger} from "../events/logger.ts";
import {Post} from "../model/postTypes.ts";
import {baseUrl} from "../config/userServerConfig.ts";


export class PostController {
    constructor(private postService: PostService) {}
        async addPost(req: express.Request, res: express.Response) {
            const body = req.body;
            const isSuccess = this.postService.addPost(body as Post);
            if (isSuccess) {
                myLogger.save(`Post with id ${body.id} was successfully added.`)
                res.writeHead(201, {'Content-Type': 'text/html'});
                res.end('Post was added');
                myLogger.log(`Response for add post with id ${body.id} was sent `);
            } else {
                res.writeHead(409, {'Content-Type': 'text/html'})
                res.end('Post already exists');
                myLogger.save(`Post with id ${body.id} already exists`);
                myLogger.log(`Post with id ${body.id} already exists`);
            }
        }
    async getAllPosts(req: express.Request, res: express.Response) {
        const posts = this.postService.getAllPosts();
        myLogger.save(`All posts were successfully retrieved`);
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(posts));
        myLogger.log(`Response for getting all users was sent`);
    }

    async getPostById(req: express.Request, res: express.Response) {

        const parsedUrl = new URL(req.url!, baseUrl);
        const id = parsedUrl.searchParams.get('id');

        if (id !== null) {
            const post = this.postService.getPostById(id);
            if (post) {
                myLogger.save(`Post with id ${id} was successfully retrieved`);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(post));
                myLogger.log(`Response for retrieved post with id ${id} was sent`);
            } else {
                res.writeHead(404, {"Content-Type": "text/plain"})
                res.end("Post not found");
                myLogger.save(`Post with id ${id} was not found`);
                myLogger.log(`Post with id ${id} was not found`);
            }
        } else {
            res.writeHead(404, {"Content-Type": "text/plain"})
            res.end("Missing id parameter")
        }
    }


    getPostByUserName(req: express.Request, res: express.Response) {
        const userName = req.query.userName as string;

        if (userName !== null) {
            const post = this.postService.getPostByUserName(userName);
            if (post) {
                myLogger.save(`Post with id ${userName} was successfully retrieved`);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(post));
                myLogger.log(`Response for retrieved post with id ${userName} was sent`);
            } else {
                res.writeHead(404, {"Content-Type": "text/plain"})
                res.end("Post not found");
                myLogger.save(`Post with id ${userName} was not found`);
                myLogger.log(`Post with id ${userName} was not found`);
            }
        } else {
            res.writeHead(404, {"Content-Type": "text/plain"})
            res.end("Missing id parameter")
        }
    }

        async updatePost(req: express.Request, res: express.Response) {
            const body = req.body;
            const id = req.query.id as string;
            const update = this.postService.updatePost(id as string, body);
                if (update)
                try {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end('Post was successfully updated');
                    myLogger.log(`Post with id ${body.id} was updated`);
                } catch(e) {
                    res.writeHead(500, {'Content-Type': 'text/html'})
                    res.end('Unexpected server error');
                    myLogger.log(`Server error`);
                    myLogger.save(`Server error` + JSON.stringify(e));
                }
            }


    async removePost(req: express.Request, res: express.Response) {

        const id = req.query.id as string;

        if (id !== null) {
            const user = this.postService.removePost(id);
            myLogger.save(`Post with id ${id} was successfully removed.`)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user));
            myLogger.log(`Response for  removed post with id ${id} was sent`);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('Post not found')
            myLogger.save(`Post with id ${id} was not found`);
            myLogger.log(`Post with id ${id} was not found`);
        }
        // if (!id) {
        //     res.status(400).send('Missing id parameter')
        //     return;
        // }
        // const post = this.postService.removePost(id);
        //
        // if (post) {
        //     myLogger.save(`Post with id ${id} was successfully removed.`)
        //     res.writeHead(200, {'Content-Type': 'application/json'})
        //     res.end(JSON.stringify(post));
        //     myLogger.log(`Response for  removed post with id ${id} was sent`);
        // } else {
        //     res.writeHead(400, {'Content-Type': 'text/html'})
        //     res.end('Post not found')
        //     myLogger.save(`Post with id ${id} was not found`);
        //     myLogger.log(`Post with id ${id} was not found`);
        // }
    }







}