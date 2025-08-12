import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Loader2,
  ImageIcon,
  Tag,
  Type,
  Palette,
  Download,
  Copy,
  Calendar,
} from "lucide-react";
import { fadeIn, typingVariants } from "../animation/variants";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";

const Marketing = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Modern");
  const [colorTheme, setColorTheme] = useState("Vibrant");
  const [format, setFormat] = useState("Poster");
  const [result, setResult] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const newResult = {
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
        caption: "Amazing poster generated based on your prompt!",
        hashtags: "#marketing #poster #branding",
        style,
        scheduledTime: new Date().toLocaleString(),
      };
      setResult(newResult);
      setRecentPosts((prev) => [newResult, ...prev]);
      setLoading(false);
    }, 2000);
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

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-10 max-w-[1200px] mx-auto">
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
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mt-4 mb-8"
      >
        <p className="text-sm text-gray-400 max-w-xl">
          Instantly create branded posters with captions and hashtags tailored
          to your style.
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-10"
      >
        {/* Left: Controls */}
        <div className="space-y-6">
          <textarea
            rows={4}
            className="w-full p-4 rounded-md bg-white/5 border border-white/20 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Describe your poster idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />

          {/* Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                value: style,
                setter: setStyle,
                options: ["Modern", "Minimalist", "Vintage", "Futuristic"],
              },
              {
                value: colorTheme,
                setter: setColorTheme,
                options: ["Vibrant", "Pastel", "Monochrome", "Dark Mode"],
              },
              {
                value: format,
                setter: setFormat,
                options: ["Poster", "Flyer", "Social Media Post", "Billboard"],
              },
            ].map((dropdown, idx) => (
              <select
                key={idx}
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
        </div>

        {/* Right: Preview */}
        <div className="space-y-4">
          <Card className="rounded-2xl overflow-hidden border border-white/20 shadow-lg">
            {loading ? (
              <div className="flex items-center justify-center h-64 bg-white/10">
                <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
              </div>
            ) : result ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Image */}
                <div className="flex flex-col">
                  <img
                    src={result.imageUrl}
                    alt="Generated poster"
                    className="w-full h-full object-cover max-h-[400px]"
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
                </div>

                {/* Right: Info */}
                <div className="p-4 flex flex-col gap-4 bg-white/5">
                  {/* Caption */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Type className="w-4 h-4 text-indigo-400" />
                      <h3 className="font-semibold text-sm">Caption</h3>
                    </div>
                    <p className="text-gray-300 text-sm">{result.caption}</p>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => handleCopy(result.caption)}
                    >
                      Copy Caption
                    </Button>
                  </div>

                  {/* Hashtags */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-indigo-400" />
                      <h3 className="font-semibold text-sm">Hashtags</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{result.hashtags}</p>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => handleCopy(result.hashtags)}
                    >
                      Copy Hashtags
                    </Button>
                  </div>

                  {/* Style */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-4 h-4 text-indigo-400" />
                      <h3 className="font-semibold text-sm">Style</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{result.style}</p>
                  </div>

                  {/* Scheduled Time */}
                  {result.scheduledTime && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        <h3 className="font-semibold text-sm">Scheduled Time</h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {result.scheduledTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <ImageIcon className="w-10 h-10 mb-2" />
                No poster generated yet.
              </div>
            )}
          </Card>

          {result && (
            <Button
              className="w-full"
              onClick={() => {
                setResult(null);
                setPrompt("");
              }}
            >
              Generate Another Poster
            </Button>
          )}
        </div>
      </motion.div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, idx) => (
              <Card
                key={idx}
                className="bg-white/5 overflow-hidden border border-white/20"
              >
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-indigo-400">
                    <Calendar className="w-4 h-4" />
                    {post.scheduledTime}
                  </div>
                  <p className="text-gray-300 text-sm">{post.caption}</p>
                  <p className="text-gray-400 text-xs">{post.hashtags}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Marketing;
