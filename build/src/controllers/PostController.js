var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { myLogger } from "../events/logger.js";
import { baseUrl } from "../config/userServerConfig.js";
export class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const isSuccess = this.postService.addPost(body);
            if (isSuccess) {
                myLogger.save(`Post with id ${body.id} was successfully added.`);
                res.writeHead(201, { 'Content-Type': 'text/html' });
                res.end('Post was added');
                myLogger.log(`Response for add post with id ${body.id} was sent `);
            }
            else {
                res.writeHead(409, { 'Content-Type': 'text/html' });
                res.end('Post already exists');
                myLogger.save(`Post with id ${body.id} already exists`);
                myLogger.log(`Post with id ${body.id} already exists`);
            }
        });
    }
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = this.postService.getAllPosts();
            myLogger.save(`All posts were successfully retrieved`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(posts));
            myLogger.log(`Response for getting all users was sent`);
        });
    }
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedUrl = new URL(req.url, baseUrl);
            const id = parsedUrl.searchParams.get('id');
            if (id !== null) {
                const post = this.postService.getPostById(id);
                if (post) {
                    myLogger.save(`Post with id ${id} was successfully retrieved`);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(post));
                    myLogger.log(`Response for retrieved post with id ${id} was sent`);
                }
                else {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end("Post not found");
                    myLogger.save(`Post with id ${id} was not found`);
                    myLogger.log(`Post with id ${id} was not found`);
                }
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Missing id parameter");
            }
        });
    }
    getPostByUserName(req, res) {
        const userName = req.query.userName;
        if (userName !== null) {
            const post = this.postService.getPostByUserName(userName);
            if (post) {
                myLogger.save(`Post with id ${userName} was successfully retrieved`);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(post));
                myLogger.log(`Response for retrieved post with id ${userName} was sent`);
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Post not found");
                myLogger.save(`Post with id ${userName} was not found`);
                myLogger.log(`Post with id ${userName} was not found`);
            }
        }
        else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Missing id parameter");
        }
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const id = req.query.id;
            try {
                this.postService.updatePost(id, body);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('User was successfully updated');
                myLogger.log(`User with id ${body.id} was updated`);
            }
            catch (e) {
                if (e === "404") {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(`User not found`);
                    myLogger.log(`User to update not found`);
                }
                else {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('Unexpected server error');
                    myLogger.log(`Server error`);
                    myLogger.save(`Server error` + JSON.stringify(e));
                }
            }
        });
    }
    // const update = this.postService.updatePost(id as string, body);
    //     if (update)
    //     try {
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end('Post was successfully updated');
    //         myLogger.log(`Post with id ${body.id} was updated`);
    //     } catch(e) {
    //         res.writeHead(500, {'Content-Type': 'text/html'})
    //         res.end('Unexpected server error');
    //         myLogger.log(`Server error`);
    //         myLogger.save(`Server error` + JSON.stringify(e));
    //     }
    // }
    removePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            if (id !== null) {
                const user = this.postService.removePost(id);
                myLogger.save(`Post with id ${id} was successfully removed.`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
                myLogger.log(`Response for  removed post with id ${id} was sent`);
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('Post not found');
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
        });
    }
}
