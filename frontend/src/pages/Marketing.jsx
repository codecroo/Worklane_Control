import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  ImageIcon,
  Download,
  Trash2,
  Briefcase,
  Palette,
  Target,
} from "lucide-react";
import { fadeIn, typingVariants } from "../animation/variants";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axiosInstance";

const Marketing = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  const [industry, setIndustry] = useState("");
  const [designStyle, setDesignStyle] = useState("");
  const [tone, setTone] = useState("");

  const fetchRecentPosts = async () => {
    try {
      const res = await axiosInstance.get("/api/marketing/all/");
      setRecentPosts(res.data);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt.");
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("industry", industry);
      formData.append("design_style", designStyle);
      formData.append("tone", tone);

      const res = await axiosInstance.post("/api/marketing/add/", formData);
      setResult(res.data);
      setRecentPosts((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to generate poster");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecentPost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await axiosInstance.delete(`/api/marketing/delete/${id}/`);
      setRecentPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen bg-black text-white relative pb-20 px-6 pt-10 max-w-[1440px] mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-3 pb-2">
        <Sparkles className="w-8 h-8" />
        <motion.h1
          variants={typingVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold overflow-hidden whitespace-nowrap leading-tight"
        >
          Poster Generator
        </motion.h1>
      </div>

      {/* Subtitle */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
      >
        <p className="text-sm text-gray-400 max-w-xl">
          Create branded posters with style and precision for your company in seconds.
        </p>
      </motion.div>

      {/* Main Layout */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6"
      >
        {/* Left: Inputs & Dropdowns */}
        <div className="space-y-6">
          {/* Left: Inputs & Dropdowns */}
          <div className="space-y-6">
            {/* Textarea */}
            <textarea
              rows={4}
              className="w-full p-4 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 resize-none
               focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300
               hover:border-indigo-400"
              placeholder="Describe your poster idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />

            {/* Dropdowns */}
            <div className="space-y-3">
              {/* Industry */}
              <div className="flex items-center bg-black/40 border border-white/20 rounded-md shadow-sm
        focus-within:border-indigo-400 hover:border-indigo-400 transition-colors duration-300
        focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-0">
                <Briefcase className="w-4 h-4 ml-3 text-indigo-400" />
                <select
                  className="flex-1 px-3 py-2 bg-black/40 text-white text-sm outline-none cursor-pointer
       focus:ring-0 transition-all duration-300"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option className="bg-black text-white">Select Industry</option>
                  <option className="bg-black text-white">Technology</option>
                  <option className="bg-black text-white">Food & Beverage</option>
                  <option className="bg-black text-white">Real Estate</option>
                  <option className="bg-black text-white">Health & Wellness</option>
                  <option className="bg-black text-white">Fashion & Retail</option>
                  <option className="bg-black text-white">Education</option>
                  <option className="bg-black text-white">Finance</option>
                </select>
              </div>

              {/* Design Style */}
              <div className="flex items-center bg-black/40 border border-white/20 rounded-md shadow-sm
        focus-within:border-indigo-400 hover:border-indigo-400 transition-colors duration-300
        focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-0">
                <Palette className="w-4 h-4 ml-3 text-pink-400" />
                <select
                  className="flex-1 px-3 py-2 bg-black/40 text-white text-sm outline-none cursor-pointer
       focus:ring-0 transition-all duration-300"
                  value={designStyle}
                  onChange={(e) => setDesignStyle(e.target.value)}
                >
                  <option className="bg-black text-white">Select Design Style</option>
                  <option className="bg-black text-white">Modern & Sleek</option>
                  <option className="bg-black text-white">Minimalist & Clean</option>
                  <option className="bg-black text-white">Bold & Attention-Grabbing</option>
                  <option className="bg-black text-white">Corporate & Professional</option>
                  <option className="bg-black text-white">Creative & Artistic</option>
                </select>
              </div>

              {/* Tone / Purpose */}
              <div className="flex items-center bg-black/40 border border-white/20 rounded-md shadow-sm
        focus-within:border-indigo-400 hover:border-indigo-400 transition-colors duration-300
        focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-0">
                <Target className="w-4 h-4 ml-3 text-green-400" />
                <select
                  className="flex-1 px-3 py-2 bg-black/40 text-white text-sm outline-none cursor-pointer
       focus:ring-0 transition-all duration-300"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option className="bg-black text-white">Select Purpose</option>
                  <option className="bg-black text-white">Product Launch</option>
                  <option className="bg-black text-white">Discount / Sale Announcement</option>
                  <option className="bg-black text-white">Event Promotion</option>
                  <option className="bg-black text-white">Brand Awareness</option>
                  <option className="bg-black text-white">Recruitment / Hiring</option>
                </select>
              </div>
            </div>

          </div>


          <Button className="w-full gap-1.5" onClick={handleGenerate}  disabled={loading}>
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
        </div>

        {/* Right: Poster Preview */}
        <div className="grid gap-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full min-h-[400px] border border-gray-700 rounded-lg"
              >
                <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
              </motion.div>
            ) : result ? (
              <motion.div
                key="poster"
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border border-gray-700 bg-black rounded-lg shadow-sm"
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
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] border border-gray-700 rounded-lg"
              >
                <ImageIcon className="w-10 h-10 mb-2 text-gray-500" />
                <p className="text-gray-400 text-sm text-center px-4">
                  Describe your poster idea, select options, and click{" "}
                  <span className="text-indigo-400">Generate</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="mt-10">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-xl font-semibold mb-4"
          >
            Recent Posters
          </motion.h2>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6"
          >
            <AnimatePresence>
              {recentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 bg-black border border-gray-700 rounded-lg flex flex-col">
                    <div className="w-full h-[200px] overflow-hidden rounded-lg mb-3">
                      <img
                        src={post.image}
                        alt="Recent poster"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-300 mb-3 truncate">{post.prompt}</p>
                    <Button
                      className="gap-1"
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
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Marketing;
