import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Eye,
  EyeOff,
  Loader2,
  ImageIcon,
  Download,
  Trash2,
  Briefcase,
  Palette,
  Target,
  Save,
  Facebook,
  Instagram,
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

  // Add new state variables
  const [accessToken, setAccessToken] = useState("");
  const [instaId, setInstaId] = useState("");
  const [fbPageId, setFbPageId] = useState("");
  const [caption, setCaption] = useState("");

  // toggle states
  const [showAccessToken, setShowAccessToken] = useState(false);
  const [showInstaId, setShowInstaId] = useState(false);
  const [showFbPageId, setShowFbPageId] = useState(false);

  // Function to save credentials to backend
  const handleSaveCredentials = async () => {
    try {
      await axiosInstance.post("/api/marketing/social/account/", {
        access_token: accessToken,
        instagram_id: instaId,
        fb_page_id: fbPageId,
      });
      alert("Credentials saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save credentials");
    }
  };

  const [posting, setPosting] = useState(false);
  const [postStatus, setPostStatus] = useState(""); // shows step/status

  // Function to post to social media
  const handlePost = async (platform) => {
    if (!result?.id) return alert("Please generate a poster first.");

    const platforms =
      platform === "both" ? ["facebook", "instagram"] : [platform];

    try {
      setPosting(true);
      setPostStatus("🚀 Starting post...");

      const res = await axiosInstance.post(
        `/api/marketing/social/post/${result.id}/`,
        {
          caption,
          platforms,
        }
      );

      // Smarter feedback per platform
      let fbMsg = "";
      let igMsg = "";

      if (res.data.facebook) {
        fbMsg = res.data.facebook.id
          ? "✅ Facebook post successful"
          : `❌ Facebook failed: ${res.data.facebook.error || "Unknown error"}`;
      }

      if (res.data.instagram) {
        igMsg = res.data.instagram?.id
          ? "Instagram ✅"
          : res.data.instagram?.error
            ? `Instagram ❌ ${res.data.instagram.error}\nDetails: ${JSON.stringify(res.data.instagram.details)}`
            : "";

      }

      setPostStatus([fbMsg, igMsg].filter(Boolean).join("\n"));
    } catch (err) {
      console.error(err?.response?.data || err.message);
      setPostStatus(`⚠️ Failed to post: ${platform}`);
    } finally {
      setPosting(false);
    }
  };


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

  const handleDownloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "poster.png";
    link.click();
  };

  const fetchCredentials = async () => {
    try {
      const res = await axiosInstance.get("/api/marketing/social/account/");
      setAccessToken(res.data.access_token || "");
      setInstaId(res.data.instagram_id || "");
      setFbPageId(res.data.fb_page_id || "");
    } catch (err) {
      console.error("Failed to fetch credentials", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRecentPosts();
    fetchCredentials();
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
        className="grid grid-cols-2 lg:grid-cols-[400px_1fr] gap-6"
      >
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

          <Button className="w-full gap-1.5" onClick={handleGenerate} disabled={loading}>
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

          {/* 2️⃣ Credentials */}
          <div className="p-4 space-y-3 border border-gray-700 rounded-lg bg-black/40">
            {/* Access Token */}
            <div className="relative">
              <input
                type={showAccessToken ? "text" : "password"}
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="Access Token"
                className="w-full p-2 pr-10 rounded bg-black/40 border border-gray-600 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowAccessToken(!showAccessToken)}
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
              >
                {showAccessToken ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Instagram ID */}
            <div className="relative">
              <input
                type={showInstaId ? "text" : "password"}
                value={instaId}
                onChange={(e) => setInstaId(e.target.value)}
                placeholder="Instagram ID"
                className="w-full p-2 pr-10 rounded bg-black/40 border border-gray-600 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowInstaId(!showInstaId)}
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
              >
                {showInstaId ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Facebook Page ID */}
            <div className="relative">
              <input
                type={showFbPageId ? "text" : "password"}
                value={fbPageId}
                onChange={(e) => setFbPageId(e.target.value)}
                placeholder="Facebook Page ID"
                className="w-full p-2 pr-10 rounded bg-black/40 border border-gray-600 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowFbPageId(!showFbPageId)}
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
              >
                {showFbPageId ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button onClick={handleSaveCredentials} className="w-full gap-2">
              <Save className="w-5 h-5" /> Save Credentials
            </Button>
          </div>

          <div className="p-4 space-y-3 border border-gray-700 rounded-lg bg-black/40">
            {/* Caption Box */}
            <textarea
              rows={3}
              placeholder="Write a caption..."
              className="w-full p-2 rounded bg-black/40 border border-gray-600 text-sm"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="flex-1 gap-1"
                onClick={() => handlePost("facebook")}
                disabled={posting}
              >
                {posting ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Posting...
                  </div>
                ) : (
                  <>
                    <Facebook className="w-4 h-4" />
                    Post on Facebook
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="flex-1 gap-1"
                onClick={() => handlePost("instagram")}
                disabled={posting}
              >
                {posting ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Posting...
                  </div>
                ) : (
                  <>
                    <Instagram className="w-4 h-4" />
                    Post on Insta
                  </>
                )}
              </Button>
            </div>

            <Button
              className="w-full"
              onClick={() => handlePost("both")}
              disabled={posting}
            >
              {posting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </div>
              ) : (
                "Post on Both"
              )}
            </Button>

            {/* Status Messages */}
            {postStatus && (
              <div className="mt-3 p-2 rounded bg-gray-800 text-sm whitespace-pre-line text-gray-300">
                {postStatus}
              </div>
            )}
          </div>

        </div>

        {/* Poster Preview Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex flex-col border border-gray-800 bg-black/60 rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Preview Header */}
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-black/40">
            <h2 className="text-sm font-medium text-gray-300">Poster Preview</h2>
            <ImageIcon className="w-4 h-4 text-gray-500" />
          </div>

          {/* Preview Body */}
          <div className="flex items-center justify-center bg-black/30 relative h-[495px] overflow-hidden">
            {result?.image ? (
              <img
                src={result.image}
                alt="Generated Poster"
                className="w-full h-full object-contain rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 h-full">
                {loading ? (
                  // 🔹 Show loader while generating
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                    <span className="text-sm">Generating...</span>
                  </div>
                ) : (
                  // 🔹 Show placeholder when not loading
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-10 h-10 text-gray-600" />
                    <p className="text-sm">Your poster will appear here once generated</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Preview Footer */}
          {result?.image && (
            <div className="p-3 border-t border-gray-800 bg-black/50">
              <Button
                className="w-full flex items-center justify-center gap-2"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5" />
                Download Poster
              </Button>
            </div>
          )}

          {/* User Guide Section (Always Visible) */}
          <div className="p-6 border-t border-gray-800 bg-black/40 text-gray-300 space-y-4">
            <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Quick Start Guide
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-black/50 border border-gray-700 hover:border-indigo-500 transition-all duration-300">
                <Briefcase className="w-6 h-6 text-indigo-500 mt-1" />
                <div>
                  <h4 className="font-medium text-white">Describe Your Idea</h4>
                  <p className="text-gray-400 text-sm">
                    Enter a short description of your poster concept in the text area.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-black/50 border border-gray-700 hover:border-green-400 transition-all duration-300">
                <Palette className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h4 className="font-medium text-white">Choose Style & Purpose</h4>
                  <p className="text-gray-400 text-sm">
                    Pick the industry, design style, and campaign purpose to shape your poster’s look and feel.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-black/50 border border-gray-700 hover:border-green-400 transition-all duration-300">
                <Target className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h4 className="font-medium text-white">Generate & Preview</h4>
                  <p className="text-gray-400 text-sm">
                    Click <span className="text-indigo-400">Generate Poster</span> to create your design.
                    Your poster will appear in the preview section.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-black/50 border border-gray-700 hover:border-indigo-500 transition-all duration-300">
                <Loader2 className="w-6 h-6 text-indigo-500 mt-1 animate-spin-slow" />
                <div>
                  <h4 className="font-medium text-white">Download & Auto-Post</h4>
                  <p className="text-gray-400 text-sm">
                    Enter your <span className="text-indigo-500">Access Token</span>,
                    <span className="text-indigo-500"> Instagram ID</span>, and
                    <span className="text-indigo-500"> Facebook Page ID</span>.
                    Save them once, then you can download or
                    post directly to Facebook & Instagram with a single click.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Posts */}
      {
        recentPosts.length > 0 && (
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
                      <div className="flex gap-2 mt-auto">
                        <Button
                          className="gap-1 flex-1"
                          size="sm"
                          variant="secondary"
                          onClick={() => handleDownloadImage(post.image)}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>

                        <Button
                          className="gap-1 flex-1"
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteRecentPost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )
      }
    </div >
  );
};

export default Marketing;