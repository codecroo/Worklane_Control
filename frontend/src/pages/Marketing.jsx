import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, ImageIcon, Download, Trash2, Briefcase, Palette, Target } from "lucide-react";
import { fadeIn, typingVariants } from "../animation/variants";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axiosInstance";

const dropdownVariant = {
  hidden: { opacity: 0, y: -7 },
  visible: { opacity: 1, y: 0 },
};

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
      <motion.h1
        variants={typingVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap leading-tight pb-2"
      >
        Poster Generator
      </motion.h1>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
      >
        Instantly create branded posters with style and precision.
      </motion.div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Left: Prompt & Dropdowns */}
        <div className="space-y-6">
          <textarea
            rows={4}
            className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md shadow-lg"
            placeholder="Describe your poster idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />

          {/* Dropdowns */}
          <motion.div variants={dropdownVariant} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <div className="flex items-center bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:border-indigo-500 transition-all">
              <Briefcase className="w-5 h-5 ml-3 text-indigo-400" />
              <select
                className="flex-1 p-3 bg-transparent outline-none text-white cursor-pointer"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option className="bg-black" value="">Select Industry</option>
                <option className="bg-black">Technology</option>
                <option className="bg-black">Food & Beverage</option>
                <option className="bg-black">Real Estate</option>
                <option className="bg-black">Health & Wellness</option>
                <option className="bg-black">Fashion & Retail</option>
                <option className="bg-black">Education</option>
                <option className="bg-black">Finance</option>
              </select>
            </div>
          </motion.div>

          <motion.div variants={dropdownVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <div className="flex items-center bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:border-indigo-500 transition-all">
              <Palette className="w-5 h-5 ml-3 text-pink-400" />
              <select
                className="flex-1 p-3 bg-transparent outline-none text-white cursor-pointer"
                value={designStyle}
                onChange={(e) => setDesignStyle(e.target.value)}
              >
                <option className="bg-black" value="">Select Design Style</option>
                <option className="bg-black">Modern & Sleek</option>
                <option className="bg-black">Minimalist & Clean</option>
                <option className="bg-black">Bold & Attention-Grabbing</option>
                <option className="bg-black">Corporate & Professional</option>
                <option className="bg-black">Creative & Artistic</option>
              </select>
            </div>
          </motion.div>

          <motion.div variants={dropdownVariant} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <div className="flex items-center bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:border-indigo-500 transition-all">
              <Target className="w-5 h-5 ml-3 text-green-400" />
              <select
                className="flex-1 p-3 bg-transparent outline-none text-white cursor-pointer"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option className="bg-black" value="">Select Purpose</option>
                <option className="bg-black">Product Launch</option>
                <option className="bg-black">Discount / Sale Announcement</option>
                <option className="bg-black">Event Promotion</option>
                <option className="bg-black">Brand Awareness</option>
                <option className="bg-black">Recruitment / Hiring</option>
              </select>
            </div>
          </motion.div>

          <Button className="w-full" onClick={handleGenerate} disabled={loading}>
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
        <Card className="rounded-2xl overflow-hidden border border-white/20 shadow-lg">
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
                  <Button className="w-full flex items-center justify-center gap-2" onClick={handleDownload}>
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
                  Describe your poster idea, select options, and click{" "}
                  <span className="text-indigo-400">Generate</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent Posters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {recentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 bg-white/5 flex flex-col border border-white/20 rounded-lg">
                    <img
                      src={post.image}
                      alt="Recent poster"
                      className="w-full object-cover rounded-lg mb-3 bg-white/10 max-h-60"
                    />
                    <p className="text-sm text-gray-300 mb-3">{post.prompt}</p>
                    <Button size="sm" variant="danger" onClick={() => handleDeleteRecentPost(post.id)}>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;
