import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, ImageIcon, Download, Trash2 } from "lucide-react";
import { fadeIn, typingVariants } from "../animation/variants";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axiosInstance";

const Marketing = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  const fetchRecentPosts = async () => {
    try {
      const res = await axiosInstance.get("/api/marketing/all/");
      setRecentPosts(res.data);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);

      const res = await axiosInstance.post("/api/marketing/add/", formData);
      const newPost = res.data;
      setResult(newPost);
      setRecentPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate poster. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecentPost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(`/api/marketing/delete/${id}/`);
      setRecentPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleDownload = () => {
    if (result?.image) {
      const link = document.createElement("a");
      link.href = result.image;
      link.download = "poster.png";
      link.click();
    }
  };

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-10 pb-40 max-w-[1400px] mx-auto">
      {/* Title */}
      <motion.h1
        variants={typingVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap leading-tight pb-2"
      >
        Poster Generator
      </motion.h1>

      {/* Intro */}
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-4 mb-8 text-sm text-gray-400 max-w-xl"
      >
        Instantly create branded posters from your custom prompts.
      </motion.p>

      {/* Layout */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2, duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6"
      >
        {/* Left: Prompt */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <textarea
            rows={4}
            className="w-full p-4 rounded-md bg-white/5 border border-white/20 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Describe your poster idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <Button
            className="w-full py-3 font-medium rounded-md flex items-center justify-center gap-2"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Poster
              </>
            )}
          </Button>
        </motion.div>

        {/* Right: Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl overflow-hidden border border-white/20 shadow-lg ">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full min-h-[400px] bg-white/10"
                >
                  <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
                </motion.div>
              ) : result ? (
                <motion.div
                  key="poster"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={result.image}
                    alt="Generated poster"
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  <div className="p-3">
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleDownload}
                    >
                      <Download className="w-5 h-5" />
                      Download Poster
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] bg-white/5"
                >
                  <ImageIcon className="w-10 h-10 mb-2 text-gray-500" />
                  <p className="text-gray-400 text-sm text-center px-4">
                    Describe your poster idea and click{" "}
                    <span className="text-indigo-400">Generate</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Posts */}
      <AnimatePresence>
        {recentPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <h2 className="text-xl font-semibold mb-4">Recent Posters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-4 bg-white/5 flex flex-col border border-white/20 rounded-lg">
                    <img
                      src={post.image}
                      alt="Recent poster"
                      className="w-full object-contain rounded-lg mb-3 bg-white/10 aspect-[3/4] max-h-45"
                    />

                    <p className="text-sm text-gray-300 mb-3">
                      {post.prompt}
                    </p>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteRecentPost(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketing;