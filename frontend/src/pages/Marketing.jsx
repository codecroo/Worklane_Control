import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  ImageIcon,
  Tag,
  Type,
  Palette,
  Download,
  Clock,
  Trash2
} from "lucide-react";
import { fadeIn, typingVariants } from "../animation/variants";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axiosInstance";

const Marketing = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Modern");
  const [colorTheme, setColorTheme] = useState("Vibrant");
  const [format, setFormat] = useState("Poster");
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
      const res = await axiosInstance.post("/api/marketing/add", {
        prompt,
        style,
        colorTheme,
        format,
      });

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
      await axiosInstance.delete(`/api/marketing/${id}/`);
      setRecentPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleDownload = () => {
    if (result?.imageUrl) {
      const link = document.createElement("a");
      link.href = result.imageUrl;
      link.download = "poster.png";
      link.click();
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
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
        Instantly create branded posters with captions and hashtags tailored to your style.
      </motion.p>

      {/* Main Layout */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2, duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6"
      >
        {/* Left: Controls */}
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

          {/* Dropdowns */}
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                label: "Style",
                value: style,
                setter: setStyle,
                options: ["Modern", "Minimalist", "Vintage", "Futuristic"],
              },
              {
                label: "Color Theme",
                value: colorTheme,
                setter: setColorTheme,
                options: ["Vibrant", "Pastel", "Monochrome", "Dark Mode"],
              },
              {
                label: "Format",
                value: format,
                setter: setFormat,
                options: ["Poster", "Flyer", "Social Media Post", "Billboard"],
              },
            ].map((dropdown, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-gray-300"
                  htmlFor={`dropdown-${idx}`}
                >
                  {dropdown.label}
                </label>
                <select
                  id={`dropdown-${idx}`}
                  value={dropdown.value}
                  onChange={(e) => dropdown.setter(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 hover:bg-white/20 transition-all duration-200 cursor-pointer"
                  disabled={loading}
                >
                  {dropdown.options.map((opt) => (
                    <option key={opt} className="bg-black text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Generate Button */}
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

        {/* Middle: Poster Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col pb-22"
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
                    src={result.imageUrl}
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

          {result && (
            <Button
              className="w-full mt-4"
              onClick={() => {
                setResult(null);
                setPrompt("");
              }}
            >
              Generate Another Poster
            </Button>
          )}
        </motion.div>

        {/* Right: Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {result ? (
            <>
              {[
                {
                  icon: <Type className="w-4 h-4 text-indigo-400" />,
                  title: "Caption",
                  content: result.caption,
                  copy: () => handleCopy(result.caption),
                },
                {
                  icon: <Tag className="w-4 h-4 text-indigo-400" />,
                  title: "Hashtags",
                  content: result.hashtags,
                  copy: () => handleCopy(result.hashtags),
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-4 bg-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {item.icon}
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                      </div>
                      <p className="text-gray-300 text-sm flex-1">
                        {item.content}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="mt-4 flex items-center justify-center"
                      onClick={item.copy}
                    >
                      Copy {item.title}
                    </Button>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-4 bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-semibold text-sm">Style</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{result.style}</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-4 bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-semibold text-sm">Best Time to Post</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{result.bestTime}</p>
                </Card>
              </motion.div>
            </>
          ) : (
            <Card className="p-4 bg-white/5 text-gray-400 text-sm text-center">
              Poster details will appear here after generation.
            </Card>
          )}
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
            <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
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
                      src={post.imageUrl}
                      alt="Recent poster"
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Caption:</strong> {post.caption}
                    </p>
                    <p className="text-sm text-gray-400 mb-1">
                      <strong>Hashtags:</strong> {post.hashtags}
                    </p>
                    <p className="text-sm text-gray-400 mb-1">
                      <strong>Style:</strong> {post.style}
                    </p>
                    <p className="text-sm text-gray-400 mb-3">
                      <strong>Best Time:</strong> {post.bestTime}
                    </p>
                    <Button
                      size="sm"
                      className="bg-red-500/20 text-red-400 hover:bg-red-500/30 mt-auto"
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
