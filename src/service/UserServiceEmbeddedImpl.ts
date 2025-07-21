import {UserService} from "./UserService.ts";
import {User} from "../model/userTypes.ts";

export class UserServiceEmbeddedImpl implements UserService {
    private users: User[] = [];
    addUser(user: User): boolean {
        if (this.users.findIndex((u:User) => u.id === user.id) === -1) {
            this.users.push(user);
            return true;
        }
        return false;
    }
    getAllUsers(): User [] {
        return [...this.users]
    }
    updateUser (newUserData:User): boolean {
        const index = this.users.findIndex((u: User) => u.id === newUserData.id);
        if (index === -1) {
            return false;
        }
        this.users[index] = newUserData;
        return true;
    }
    removeUser (userId: number): User | null {
        const index = this.users.findIndex((u: User) => u.id === userId);
        if (index === -1) {
            return null
        }
        return this.users.splice(index, 1) [0];
    }
    getUser (userId: number): User | undefined {
        return this.users.find((u:User) => u.id === userId);
    }
}