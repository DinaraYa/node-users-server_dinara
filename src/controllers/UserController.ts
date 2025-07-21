import {UserService} from "../service/UserService.ts";
import {parseBody} from "../utils/tools.ts";
import {User} from "../model/userTypes.ts";
import {IncomingMessage, ServerResponse} from "node:http";
import {myLogger} from "../events/logger.ts";

export class UserController {
    constructor(private userService: UserService) { }
    async addUser(req: IncomingMessage, res: ServerResponse ) {
        const body = await parseBody(req) as User;
        const isSuccess = this.userService.addUser(body as User);
        if (isSuccess) {
            myLogger.save(`User with id$ {body.id} was successfully added.`)
            res.writeHead(201, {'Content-Type': 'text/html'});
            res.end('User was added');
            myLogger.log(`Response for add user with id ${body.id} was sent`);
        } else {
            res.writeHead(409, {'Content-Type': 'text/html'})
            res.end('User already exists');
            myLogger.save(`User with id ${body.id} already exists`);
            myLogger.log(`User with id ${body.id} already exists`);
        }
    }
    async getAllUsers(req: IncomingMessage, res: ServerResponse) {
        const users = this.userService.getAllUsers();
        myLogger.save(`All users were successfully retrieved`);
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users));
        myLogger.log(`Response for getting all users was sent`);
    }
    async updateUser(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as User;
        const isSuccess = this.userService.updateUser(body as User);
        if (isSuccess) {
            myLogger.save(`User with id ${body.id} was successfully updated.`)
            res.writeHead(200, {"Content-Type": "text/plain"})
            res.end("User was successfully update")
            myLogger.log(`Response for updated user with id ${body.id} was sent.`)
        } else {
            res.writeHead(409, {"Content-Type": "text/plain"})
            res.end("User not found");
            myLogger.save(`User with id ${body.id} was not found`);
            myLogger.log(`User with id ${body.id} was not found`)
        }
    }
    async removeUser(req: IncomingMessage, res: ServerResponse) {
        const user = await parseBody(req) as User;
        const isSuccess = this.userService.removeUser(user.id);
        if (isSuccess) {
            myLogger.save(`User with id ${user.id} was successfully removed.`)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(isSuccess));
            myLogger.log(`Response for  removed user with id ${user.id} was sent`);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('User not found')
            myLogger.save(`User with id ${user.id} was not found`);
            myLogger.log(`User with id ${user.id} was not found`);
        }
    }
    async getUser(req: IncomingMessage, res: ServerResponse) {
        const parsedUrl = new URL(req.url!, "http://localhost:3017");
        const id = parsedUrl.searchParams.get('userId');
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