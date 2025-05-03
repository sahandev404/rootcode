import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPostById, updatePost } from "../services/PostService";
import { PostForm } from "../types/types";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostForm>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setFetchLoading(true);
        const post = await getPostById(id);
        setFormData({
          title: post.title,
          content: post.content,
        });
        setFetchLoading(false);
      } catch (error: any) {
        setFetchLoading(false);
        setError("Failed to load post: " + error.message);
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      await updatePost(id, formData);
      setLoading(false);
      // Redirect to post page after successful update
      navigate(`/post/${id}`);
    } catch (error: any) {
      setLoading(false);
      setError(error.message || "An error occurred while updating the post.");
      console.error("Error updating post:", error);
    }
  };

  if (fetchLoading) {
    return (
      <div>
        <Navbar titile="Edit Post" />
        <div className="max-w-2xl mx-auto p-4 text-center">
          Loading post...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar titile={`Edit: ${formData.title}`} />
      <div className="max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Write your post content here..."
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate(`/post/${id}`)}
              className="mr-2 bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black disabled:bg-gray-500"
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;