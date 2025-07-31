import { EventEmitter } from "node:events";
export const emitter = new EventEmitter();
emitter.on('user_added', () => {
    console.log("User was added successfully.");
});
emitter.on('get_all_users', () => {
    console.log('Get all users successfully.');
});
emitter.on('user_updated', () => {
    console.log("User was updated successfully.");
});
emitter.on('user_removed', () => {
    console.log("User was removed successfully.");
});
emitter.on('get_user_by_id', () => {
    console.log('Get user by id successfully.');
});
