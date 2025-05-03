import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { getPosts } from "../services/PostService";
import { PostType } from "../types/types";
import Post from "../components/Post";

const Home = () => {

    const [posts, setPosts] = useState<PostType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    //fetching posts from the API
    useEffect(() => {
        setLoading(true)
        getPosts().then((response) => {
            console.log("Posts:", response)
            setPosts(response)
            setLoading(false)
            setError(null)
        }).catch((error) => {
            console.error("Error fetching posts:", error)
            setLoading(false)
            setError(error.message || "An error occurred while fetching posts.")
        });
    }, []);

  return (
    <div className="">
        <Navbar titile="Home" />
        <div className="flex flex-col items-center w-full">
            <div className="mt-5 mb-7">
                <a href="/new" className="bg-gray-800 text-white px-7 py-2 rounded hover:bg-gray-900 transition duration-200">
                    Create new post
                </a>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && posts.length === 0 && <p>No posts available</p>}
            {!loading && !error && posts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {posts.map((post) => (
                        <Post key={post.id} postDetails={post} />
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Home