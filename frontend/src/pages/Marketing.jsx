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
  Clock,
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
      const newPost = {
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
        caption: "Amazing poster generated based on your prompt!",
        hashtags: "#marketing #poster #branding",
        style,
        bestTime: "6:00 PM", // Simulated best time
      };
      setResult(newPost);
      setRecentPosts((prev) => [newPost, ...prev]);
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
    <div className="min-h-screen bg-black text-white px-6 pt-10 pb-40 max-w-[1400px] mx-auto">
      {/* Title */}
      <motion.h1
        variants={typingVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold overflow-hidden whitespace-nowrap leading-tight pb-2"
      >
        Poster Generator
      </motion.h1>

      {/* Intro */}
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mt-4 mb-8 text-sm text-gray-400 max-w-xl"
      >
        Instantly create branded posters with captions and hashtags tailored to your style.
      </motion.p>

      {/* Main Layout */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6"
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
          <div className="grid grid-cols-1 gap-4">
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
                options: [
                  "Poster",
                  "Flyer",
                  "Social Media Post",
                  "Billboard",
                ],
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

        {/* Middle: Poster Preview */}
        <div className="flex flex-col pb-22">
          <Card className="rounded-2xl overflow-hidden border border-white/20 shadow-lg ">
            {loading ? (
              <div className="flex items-center justify-center h-full min-h-[400px] bg-white/10">
                <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
              </div>
            ) : result ? (
              <>
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

              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-white/5">
                <ImageIcon className="w-10 h-10 mb-2 text-gray-500" />
                <p className="text-gray-400 text-sm text-center px-4">
                  Describe your poster idea and click{" "}
                  <span className="text-indigo-400">Generate</span>
                </p>
              </div>
            )}
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
        </div>

        {/* Right: Info Cards */}
        <div className="space-y-4">
          {result ? (
            <>
              <Card className="p-4 bg-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-semibold text-sm">Caption</h3>
                  </div>
                  <p className="text-gray-300 text-sm flex-1">
                    {result.caption}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="mt-4 flex items-center justify-center"
                  onClick={() => handleCopy(result.caption)}
                >
                  Copy Caption
                </Button>
              </Card>

              <Card className="p-4 bg-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-semibold text-sm">Hashtags</h3>
                  </div>
                  <p className="text-gray-400 text-sm flex-1">
                    {result.hashtags}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="mt-4 flex items-center justify-center"
                  onClick={() => handleCopy(result.hashtags)}
                >
                  Copy Hashtags
                </Button>
              </Card>

              <Card className="p-4 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-semibold text-sm">Style</h3>
                </div>
                <p className="text-gray-400 text-sm">{result.style}</p>
              </Card>

              {/* Best Time to Post */}
              <Card className="p-4 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-semibold text-sm">Best Time to Post</h3>
                </div>
                <p className="text-gray-400 text-sm">{result.bestTime}</p>
              </Card>
            </>
          ) : (
            <Card className="p-4 bg-white/5 text-gray-400 text-sm text-center">
              Poster details will appear here after generation.
            </Card>
          )}
        </div>
      </motion.div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, idx) => (
              <Card
                key={idx}
                className="p-4 bg-white/5 flex flex-col border border-white/20 rounded-lg"
              >
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
                <p className="text-sm text-gray-400">
                  <strong>Best Time:</strong> {post.bestTime}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;