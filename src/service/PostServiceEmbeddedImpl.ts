import {PostService} from "./PostService.ts";
import {Post} from "../model/postTypes.ts";
import {User} from "../model/userTypes.ts";
import {users} from "./UserServiceEmbeddedImpl.ts"


export class PostServiceEmbeddedImpl implements PostService {
    private posts: Post [] =[];

    addPost(post: Post): boolean {
        if (this.posts.findIndex((p: Post) => p.id === post.id) === -1) {
            this.posts.push(post);
            return true;
        }
        return false;
    }

    getAllPosts(): Post [] {
        return [...this.posts];
    }

    getPostById (postId: string): Post | undefined {
        return this.posts.find((p: Post) => p.id === postId);
    }

    getPostByUserName (userName: string): Post[] {
            const foundUser = users.find((u: User) => u.userName === userName);
            if (!foundUser) return [];
            return this.posts.filter((p: Post) => p.userId === foundUser.id.toString());
    }

    updatePost(id:string, newPostData:Post): boolean {
        const index = this.posts.findIndex((p: Post) => p.id === id);
        console.log(index)
        if (index === -1) {
            return false;
        }
        this.posts[index] = newPostData;
        return true;

    }
    removePost(postId: string): Post | null{
        const index = this.posts.findIndex((p: Post) => p.id === postId);
        console.log(index);
        if (index === -1) {
            return null;
        }
        const [removed] = this.posts.splice(index, 1);
        return removed;
    }



}