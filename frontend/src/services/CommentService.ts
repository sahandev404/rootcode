import { BackendUrl } from "../config/config";
import { CommentForm } from "../types/types";
import axios from "axios";

export const CreateComment = async (postId: string, comment: CommentForm) => {
    try {
        const response = await axios.post(`${BackendUrl}/posts/comments/${postId}`, comment)
        return response.data
    } catch (error) {
        console.error("Error creating post:", error)
        throw error
    }

}

export const getComments = async (postId: string) => {
    try {
        const response = await axios.get(BackendUrl + `/posts/${postId}/comments`)  
        return response.data
    } catch (error) {
        console.error("Error fetching posts:", error)
        throw error
    }
}