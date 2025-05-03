import { BackendUrl } from "../config/config";
import { CommentForm } from "../types/types";
import axios from "axios";

export const CreateComment = async (postId: string, comment: CommentForm) => {
    try {
        const response = await axios.post(BackendUrl + "/posts/" + postId + "/comments", comment)
        return response.data
    } catch (error) {
        console.error("Error creating post:", error)
        throw error
    }

}