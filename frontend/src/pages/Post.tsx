import { useEffect, useState, createContext, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById, deletePost } from '../services/PostService'
import { PostType } from '../types/types'
import CommentSection from '../components/CommentSection'
import Navbar from '../components/Navbar'

// Create a context specifically for a single post
type PostContextType = {
  post: PostType | null;
  loading: boolean;
  error: string | null;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Custom hook to use the post context
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

const Post = () => {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [post, setPost] = useState<PostType | null>(null)

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return
            setLoading(true)
            try {
                const response = await getPostById(id)
                console.log("Post:", response)
                setPost(response)
                setLoading(false)
                setError(null)
            } catch (error: any) {
                console.error("Error fetching post:", error)
                setLoading(false)
                setError(error.message || "An error occurred while fetching the post.")
            }
        }

        fetchPost()
    }, [id])

    return (
        <div className="">
            <Navbar titile="Post Details" />
            
            <PostContext.Provider value={{ post, loading, error }}>
                <div className="w-full max-w-4xl mx-auto">
                    <PostContent />
                    {post && <CommentSection />}
                </div>
            </PostContext.Provider>
        </div>
    )
}

const PostContent = () => {
    const { post, loading, error } = usePostContext()
    const navigate = useNavigate()

    const handleDelete = async () => {
        if (!post) return
        
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(post.id)
                navigate('/')
            } catch (error: any) {
                console.error('Error deleting post:', error)
                alert(error.message || 'An error occurred while deleting the post.')
            }
        }
    }

    if (loading) return <div className="text-center py-8">Loading...</div>
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>
    if (!post) return <div className="text-center py-8">Post not found</div>

    return (
        <div className="border-black border-2 rounded-md p-6 mb-8 w-full max-w-4xl mt-5">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-2">Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            <div className="mt-6 text-gray-800">
                <p>{post.content}</p>
            </div>
            <div className="mt-6 flex justify-end items-center gap-6">
                <a href="/">Back to home</a>
                
                <button 
                    onClick={handleDelete}
                    className="bg-gray-200 text-black px-5 py-2 rounded hover:bg-gray-300 transition duration-200">
                    Delete Post
                </button>
                <a href={`/edit/${post.id}`} className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-900 transition duration-200 mr-2">
                    Edit Post
                </a>
                
            </div>
        </div>
    )
}

export default Post