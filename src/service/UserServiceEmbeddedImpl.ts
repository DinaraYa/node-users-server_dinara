import {UserService} from "./UserService.ts";
import {User} from "../model/userTypes.ts";
import {UserFilePersistenceService} from "./UserFilePersistenceService.ts";
import fs from "fs";
import {myLogger} from "../events/logger.ts";



export const users: User[] = []

export class UserServiceEmbeddedImpl implements UserService, UserFilePersistenceService{
    private users: User[] = [];

    private rs = fs.createReadStream('src/data.txt', {encoding: 'utf8', highWaterMark: 24});

    addUser(user: User): boolean {
        if (this.users.findIndex((u: User) => u.id === user.id) === -1) {
            this.users.push(user);
            return true;
        }
        return false;
    }

    getAllUsers(): User [] {
        return [...this.users]
    }

    updateUser(id: number, newUserData: User): boolean {
        const index = this.users.findIndex((u: User) => u.id === id);
        if (index === -1) {
            return false;
        }
        this.users[index] = newUserData;
        return true;
    }

    removeUser(userId: number): User | null {
        const index = this.users.findIndex((u: User) => u.id === userId);
        if (index === -1) {
            return null
        }
        return this.users.splice(index, 1) [0];
    }

    getUser(userId: number): User | undefined {
        return this.users.find((u: User) => Number(u.id) === Number(userId));
    }

    restoreDataFromFile(): string {
        let result = ""
        this.rs.on('data', (chunk) => {
            if (chunk) {
                result += chunk.toString
            } else {
                result = "[]";
            }
        })
        this.rs.on('end', () => {
            if (result) {
                this.users = JSON.parse(result);
                myLogger.log("Data was restored from file");
                myLogger.log("Data was restored from file");
                this.rs.close();
            } else {
                this.users = [{id: 123, userName: "Panikovsky"}]
            }
        })
        this.rs.on('error', () => {
            this.users = [{id: 2, userName: "Bender"}]
            myLogger.log("File to restore not found");
        })
        return "OK";
    }


    saveDataToFile(): Promise<string> {
        return new Promise((resolve, reject) => {
            try{
                const ws = fs.createWriteStream('data_new.txt')
                myLogger.log("Ws created")
                const data = JSON.stringify(this.users);
                myLogger.log(data);
                ws.write((data), (e) => {
                    if (e) {
                        myLogger.log("Error!" + e?.message);
                        reject(e);
                    } else {
                        ws.end();
                    }
                });
                ws.on('finish', () => {
                    myLogger.log("Data was saved to file");
                    myLogger.save("Data was saved to file");
                    resolve("Ok");

                })
                ws.on('error', () => {
                    myLogger.log("error: data not saved!")
                    reject("Error: data not saved!");
                })
                return "Ok";
            } catch (error) {
                console.log("Error: ", error);
                myLogger.log("Error saveDataToFile ")
            }
            return "ok"
        })
    }
}

