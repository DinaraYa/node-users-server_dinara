import {PostService} from "./PostService.ts";
import {Post} from "../model/postTypes.ts";
import {User} from "../model/userTypes.ts";
import {users} from "./UserServiceEmbeddedImpl.ts"
import {HttpError} from "../errorHandler/HttpError.js";


export class PostServiceEmbeddedImpl implements PostService {
    private posts: Post [] = [];

    addPost(post: Post): boolean {
        const index = this.posts.findIndex((p: Post) => p.id === post.id);
        if (index !== -1) throw new HttpError( 404,  "Post not found");
        this.posts.push(post);
        return true;
    }

    getAllPosts(): Post [] {
        return [...this.posts];
    }

    getPostById(postId: number): Post {
         const index: number = this.posts.findIndex((p: Post) => Number(p.id) === Number(postId));
       // if (index === -1) throw new Error(JSON.stringify({status: 404, message: "Post not found"}))
        if (index === -1) throw new HttpError( 404,  "Post not found");

        return this.posts[index]
    }

    getPosts(id: number): Post {
        const index = users.findIndex((u: User) => Number(u.id) === id);
        if (index === -1)
            throw new HttpError(404, "Post not found")
        return this.posts[index];
    }

    getAllUserPosts(userId: number): Post[] {
        return this.posts.filter(item => Number(item.userId) === Number(userId));
    }

    updatePost(newPostData: Post): boolean {
        const index = this.posts.findIndex((p: Post) => Number(p.id) === Number(newPostData.id));
        if (index === -1) throw new HttpError( 404,  "Post not found");
        this.posts[index] = newPostData;
        console.log([...this.posts]);
        return true;
    }

    removePost(postId: number): Post {
        const index: number = this.posts.findIndex((p: Post) => Number(p.id) === Number(postId));
        if (index === -1) throw new HttpError(404, "Post not found");
        return this.posts.splice(index, 1) [0];
    }
}