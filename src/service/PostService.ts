import {Post} from "../model/postTypes.ts";


export interface PostService {
    addPost(post: Post): boolean;
    getAllPosts(): Post [];
    getPostById (postId: string): Post  | undefined;
    getPostByUserName (userName: string): Post [];
    updatePost(id:string, newPostData:Post): boolean;
    removePost(postId: string): Post | null;
}