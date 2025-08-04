import {IncomingMessage} from "node:http";
import {Post} from "../model/postTypes.js";


export const isUserType = (obj:any):boolean => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'number' &&
        typeof obj.userName === 'string'
    );
}

export function convertPostDto(postDto: unknown) {
    const post = postDto as Post;
    if (!post.id || !post.userId)
        return null;
    if(!post.text) post.text = "Some text";
    if (!post.title) post.title ="No title";
    return post;
}