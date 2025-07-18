// src/pages/Marketing.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, CalendarClock, Sparkles, Clock4 } from "lucide-react";
import { fadeIn, typingVariants } from "../animation/variants";
import { Card } from "../components/ui/Card";

const campaigns = [
  {
    name: "Summer Sale",
    status: "Scheduled",
    date: "2025-07-25",
    posts: 4,
  },
  {
    name: "AI Launch Promo",
    status: "Active",
    date: "2025-07-20",
    posts: 3,
  },
  {
    name: "Product Teasers",
    status: "Draft",
    date: "2025-08-01",
    posts: 2,
  },
];

const Marketing = () => {
  const [search, setSearch] = useState("");

  const filtered = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pb-20 px-6 pt-10 max-w-[1440px] mx-auto">
      {/* Heading */}
      <motion.h1
        variants={typingVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap leading-tight pb-2"
      >
        Marketing
      </motion.h1>

      {/* Description and Search */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
      >
        <p className="text-sm text-gray-400 max-w-xl">
          Plan, generate, and track marketing campaigns and content across platforms.
        </p>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search campaigns..."
          className="bg-white/10 border border-white/20 px-4 py-2 text-sm rounded-md backdrop-blur placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
        />
      </motion.div>

      {/* Grid Sections */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"
      >
        {/* Campaigns */}
        {filtered.map((camp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-transform hover:scale-[1.01] duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Megaphone className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold">{camp.name}</h2>
              </div>
              <p className="text-sm text-gray-300 mb-2">Status: <span className="text-white">{camp.status}</span></p>
              <p className="text-sm text-gray-300 mb-2">Scheduled: {camp.date}</p>
              <p className="text-sm text-gray-300">Posts: {camp.posts}</p>
            </Card>
          </motion.div>
        ))}

        {/* AI Poster Generator */}
        <Card className="bg-gradient-to-br from-blue-700/20 to-purple-700/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-transform hover:scale-[1.01] duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold">AI Poster Generator</h2>
          </div>
          <p className="text-sm text-gray-300 mb-2">
            Instantly create engaging marketing posters based on your campaign goals.
          </p>
          <button className="mt-4 bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm hover:bg-white/20 transition">
            Generate Poster
          </button>
        </Card>

        {/* Upcoming Scheduled Posts */}
        <Card className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-transform hover:scale-[1.01] duration-300">
          <div className="flex items-center gap-3 mb-3">
            <CalendarClock className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold">Scheduled Posts</h2>
          </div>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Instagram: “🔥 AI Launch” - 20 July</li>
            <li>• LinkedIn: “Team Spotlight” - 21 July</li>
            <li>• Twitter: “Behind the Scenes” - 22 July</li>
          </ul>
        </Card>

        {/* Content Queue */}
        <Card className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-transform hover:scale-[1.01] duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Clock4 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-semibold">Content Queue</h2>
          </div>
          <p className="text-sm text-gray-300 mb-2">3 posts are in draft stage waiting for review.</p>
          <button className="mt-2 bg-white/10 border border-white/20 rounded-md px-4 py-2 text-sm hover:bg-white/20 transition">
            Review Content
          </button>
        </Card>
      </motion.div>
    </div>
  );
};

export default Marketing;
