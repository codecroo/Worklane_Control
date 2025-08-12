import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ImageIcon, Tag, Type, Palette, Download, Copy } from "lucide-react";
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

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        imageUrl: "https://via.placeholder.com/600x400?text=Generated+Poster",
        caption: "Amazing poster generated based on your prompt!",
        hashtags: "#marketing #poster #branding",
        style,
      });
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
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-4 mb-8">
        <p className="text-sm text-gray-400 max-w-xl">
          Instantly create branded posters with captions and hashtags tailored to your style.
        </p>
      </motion.div>

      {/* Content */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-10">
        {/* Left: Controls */}
        <div className="space-y-6">
          {/* Prompt Textbox */}
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
              { value: style, setter: setStyle, options: ["Modern", "Minimalist", "Vintage", "Futuristic"] },
              { value: colorTheme, setter: setColorTheme, options: ["Vibrant", "Pastel", "Monochrome", "Dark Mode"] },
              { value: format, setter: setFormat, options: ["Poster", "Flyer", "Social Media Post", "Billboard"] },
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
          <Button className="w-full py-3 font-medium rounded-md flex items-center justify-center gap-2" onClick={handleGenerate} disabled={loading}>
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
        <div className="space-y-6">
          <Card className="relative rounded-2xl overflow-hidden border border-white/20 shadow-lg">
            {loading ? (
              <div className="flex items-center justify-center h-64 bg-white/10">
                <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
              </div>
            ) : result ? (
              <>
                <img src={result.imageUrl} alt="Generated poster" className="w-full object-cover max-h-[400px]" />
                <button
                  onClick={handleDownload}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition"
                  title="Download Poster"
                >
                  <Download className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <ImageIcon className="w-10 h-10 mb-2" />
                No poster generated yet.
              </div>
            )}
          </Card>

          {result && (
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Caption */}
              <Card className="p-4 bg-white/5 relative">
                <div className="flex items-center gap-2 mb-2">
                  <Type className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-semibold text-sm">Caption</h3>
                  <button
                    onClick={() => handleCopy(result.caption)}
                    className="ml-auto text-gray-400 hover:text-white transition"
                    title="Copy Caption"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm">{result.caption}</p>
              </Card>

              {/* Hashtags */}
              <Card className="p-4 bg-white/5 relative">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-semibold text-sm">Hashtags</h3>
                  <button
                    onClick={() => handleCopy(result.hashtags)}
                    className="ml-auto text-gray-400 hover:text-white transition"
                    title="Copy Hashtags"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-400 text-sm">{result.hashtags}</p>
              </Card>

              {/* Style */}
              <Card className="p-4 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-semibold text-sm">Style</h3>
                </div>
                <p className="text-gray-400 text-sm">{result.style}</p>
              </Card>
            </div>
          )}

          {result && (
            <Button className="w-full" onClick={() => { setResult(null); setPrompt(""); }}>
              Generate Another Poster
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Marketing;
