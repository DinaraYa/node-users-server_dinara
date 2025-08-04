import {Post} from "../model/postTypes.ts";


export interface PostService {
    addPost(post: Post): boolean;
    getAllPosts(): Post [];
    getPostById (postId: number): Post;
    getPosts(id: number): Post;
    getAllUserPosts (userId:number):Post[];
    updatePost(newPostData:Post): boolean;
    removePost(postId: number): Post;
}
