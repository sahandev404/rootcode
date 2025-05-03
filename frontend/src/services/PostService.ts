import axios from "axios"
import { BackendUrl } from "../config/config"
import { PostForm } from "../types/types"

export const getPosts = async () => {
    try {
        const response = await axios.get(BackendUrl + "/posts")  
        return response.data
    } catch (error) {
        console.error("Error fetching posts:", error)
        throw error
    }
}

export const getPostById = async (id: string) => {
    try {
        const response = await axios.get(BackendUrl + `/posts/${id}`)  
        return response.data
    } catch (error) {
        console.error("Error fetching post:", error)
        throw error
    }
}

export const createPost = async (post: PostForm) => {
    try {
        const response = await axios.post(BackendUrl + "/posts", post)  
        return response.data
    } catch (error) {
        console.error("Error creating post:", error)
        throw error
    }
}

export const updatePost = async (id: string, post: PostForm) => {
    try {
        const response = await axios.put(BackendUrl + `/posts/${id}`, post)  
        return response.data
    } catch (error) {
        console.error("Error updating post:", error)
        throw error
    }
}

export const deletePost = async (id: string) => {
    try {
        const response = await axios.delete(BackendUrl + `/posts/${id}`)  
        return response.data
    } catch (error) {
        console.error("Error deleting post:", error)
        throw error
    }
}

