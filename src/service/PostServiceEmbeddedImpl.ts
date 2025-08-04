import {PostService} from "./PostService.ts";
import {Post} from "../model/postTypes.ts";
import {User} from "../model/userTypes.ts";
import {users} from "./UserServiceEmbeddedImpl.ts"
import {HttpError} from "../errorHandler/HttpError.js";


export class PostServiceEmbeddedImpl implements PostService {
    private posts: Post [] = [];

    addPost(post: Post): boolean {
        const index = this.posts.findIndex((p: Post) => p.id === post.id);
        if (index !== -1)
            return false;
        this.posts.push(post);
        return true;
    }

    getAllPosts(): Post [] {
        return [...this.posts];
    }

    getPostById(postId: number): Post {
        const index: number = this.posts.findIndex((p: Post) => Number(p.id) === Number(postId));
        if (index === -1) {
            console.log((this.posts)[index].id)
            throw new HttpError(404, "Post not found")
        }
        return this.posts[index];
    }

    getPosts(id: number): Post {
        const index = users.findIndex((u: User) => Number(u.id) === id);
        console.log("Function " + id, typeof id);
        if (index === -1)
            throw new HttpError(404, "Post not found")
        return this.posts[index];
    }

    getAllUserPosts(userId: number): Post[] {
        return this.posts.filter(item => Number(item.userId) === Number(userId));
    }

    updatePost(newPostData: Post): boolean {
        const index = this.posts.findIndex((p: Post) => Number(p.id) === Number(newPostData.id));
        console.log("Index" + index)
        if (index === -1) {
            return false;
        }
        this.posts[index] = newPostData;
        console.log([...this.posts]);
        return true;

    }

    removePost(postId: number): Post {
        const index: number = this.posts.findIndex((p: Post) => Number(p.id) === Number(postId));
        console.log("Index" + index)
        console.log("Список постов:", this.posts);
        if (index === -1) throw new Error("Post not found")
        return this.posts.splice(index, 1) [0]
    }
}