import {UserService} from "../service/UserService.ts";
import {User} from "../model/userTypes.ts";
import {myLogger} from "../events/logger.ts";
import {baseUrl} from "../config/userServerConfig.ts";
import express from "express";

export class UserController {
    constructor(private userService: UserService) { }

    async addUser(req: express.Request, res: express.Response ) {
        //const body = await parseBody(req) as User;
        const body = req.body;
        const isSuccess = this.userService.addUser(body as User);
        if (isSuccess) {
            myLogger.save(`User with id ${body.id} was successfully added.`)
            res.writeHead(201, {'Content-Type': 'text/html'});
            res.end('User was added');
            myLogger.log(`Response for add user with id ${body.id} was sent `);
        } else {
            res.writeHead(409, {'Content-Type': 'text/html'})
            res.end('User already exists');
            myLogger.save(`User with id ${body.id} already exists`);
            myLogger.log(`User with id ${body.id} already exists`);
        }
    }
    async getAllUsers(req: express.Request, res: express.Response) {
        const users = this.userService.getAllUsers();
        myLogger.save(`All users were successfully retrieved`);
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users));
        myLogger.log(`Response for getting all users was sent`);
    }

    async updateUser(req: express.Request, res: express.Response) {
        const body = req.body;
        const parsedUrl = new URL(req.url!, baseUrl);
        const id = parsedUrl.searchParams.get('id');

        const idUser = Number(id);

        try {
            this.userService.updateUser(idUser, body);
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end('User was successfully updated');
            myLogger.log(`User with id ${body.id} was updated`);
        } catch (e) {
            if(e === "404"){
                res.writeHead(404, {'Content-Type': 'text/html'})
                res.end(`User not found`)
                myLogger.log(`User to update not found`);
            }else{
                res.writeHead(500, {'Content-Type': 'text/html'})
                res.end('Unexpected server error');
                myLogger.log(`Server error`);
                myLogger.save(`Server error` + JSON.stringify(e));
            }
        }
    }

    async removeUser(req: express.Request, res: express.Response) {

        const parsedUrl = new URL(req.url!, baseUrl);
        const id = parsedUrl.searchParams.get('id');

        if (id !== null) {
        const user = this.userService.removeUser(Number(id));
            myLogger.save(`User with id ${id} was successfully removed.`)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user));
            myLogger.log(`Response for  removed user with id ${id} was sent`);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('User not found')
            myLogger.save(`User with id ${id} was not found`);
            myLogger.log(`User with id ${id} was not found`);
        }
    }
    async getUser(req: express.Request, res: express.Response) {

        const parsedUrl = new URL(req.url!, baseUrl);
        const id = parsedUrl.searchParams.get('id');

        if (id !== null) {
            const user = this.userService.getUser(Number(id));
            if (user) {
                myLogger.save(`Users with id ${id} was successfully retrieved`);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(user));
                myLogger.log(`Response for retrieved user with id ${id} was sent`);
            } else {
                res.writeHead(404, {"Content-Type": "text/plain"})
                res.end("User not found");
                myLogger.save(`User with id ${id} was not found`);
                myLogger.log(`User with id ${id} was not found`);
            }
        } else {
            res.writeHead(404, {"Content-Type": "text/plain"})
            res.end("Missing id parameter")
        }
    }


}