import { users } from "./UserServiceEmbeddedImpl.js";
export class PostServiceEmbeddedImpl {
    constructor() {
        this.posts = [];
    }
    addPost(post) {
        if (this.posts.findIndex((p) => p.id === post.id) === -1) {
            this.posts.push(post);
            return true;
        }
        return false;
    }
    getAllPosts() {
        return [...this.posts];
    }
    getPostById(postId) {
        return this.posts.find((p) => p.id === postId);
    }
    getPostByUserName(userName) {
        const foundUser = users.find((u) => u.userName === userName);
        if (!foundUser)
            return [];
        return this.posts.filter((p) => p.userId === foundUser.id.toString());
    }
    updatePost(id, newPostData) {
        const index = this.posts.findIndex((p) => p.id === id);
        if (index === -1) {
            return false;
        }
        this.posts[index] = newPostData;
        return true;
    }
    removePost(postId) {
        const index = this.posts.findIndex((p) => p.id === postId);
        if (index === -1) {
            return null;
        }
        const [removed] = this.posts.splice(index, 1);
        return removed;
    }
}
