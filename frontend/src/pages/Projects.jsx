import { useState } from "react";
import { motion } from "framer-motion";
import { typingVariants, fadeIn } from "../animation/variants";
import { Users, Calendar, CheckCircle, Search } from "lucide-react";

const projects = [
    {
        name: "Marketing Revamp",
        deadline: "2025-08-15",
        team: ["Priya", "Alisha"],
        stages: ["Planning", "Copywriting", "Design Review"],
        completed: 2,
    },
    {
        name: "AI Assistant Integration",
        deadline: "2025-09-01",
        team: ["Soham", "Nikhil"],
        stages: ["Model Testing", "Frontend Integration", "QA"],
        completed: 1,
    },
    {
        name: "Website Launch",
        deadline: "2025-07-30",
        team: ["Jatin", "Riya"],
        stages: ["Final UI Fixes", "SEO Setup", "Launch"],
        completed: 3,
    },
    {
        name: "Social Campaign",
        deadline: "2025-08-05",
        team: ["Meena", "Devansh"],
        stages: ["Strategy", "Asset Design", "Posting"],
        completed: 1,
    },
];

const Project = () => {
    const [search, setSearch] = useState("");

    const filteredProjects = projects.filter((proj) => {
        const searchLower = search.toLowerCase();
        return (
            proj.name.toLowerCase().includes(searchLower) ||
            proj.team.some((member) => member.toLowerCase().includes(searchLower)) ||
            proj.stages.some((stage) => stage.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className="min-h-screen bg-black text-white pb-20 px-6 pt-10 max-w-[1440px] mx-auto">
            {/* Heading */}
            <motion.h1
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap"
            >
                Projects
            </motion.h1>

            {/* Description + Search */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
            >
                <p className="text-sm text-gray-400">
                    View and track project deadlines, assigned teams, and current progress.
                </p>

                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white/10 border border-white/20 px-8 py-2 text-sm rounded-md backdrop-blur placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                    />
                </div>
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
            >
                {filteredProjects.map((proj, i) => {
                    const total = proj.stages.length;
                    const completed = proj.completed;
                    const percent = Math.floor((completed / total) * 100);

                    return (
                        <motion.div
                            key={i}
                            className="bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-md flex flex-col justify-between gap-4"
                        >
                            {/* Title + Team */}
                            <div>
                                <h2 className="text-lg font-semibold mb-1">{proj.name}</h2>
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                    <Users className="w-4 h-4" />
                                    {proj.team.join(", ")}
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Calendar className="w-4 h-4" />
                                Deadline: <span className="text-white">{proj.deadline}</span>
                            </div>

                            {/* Progress */}
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Progress</span>
                                    <span>{percent}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-300"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                                <div className="flex gap-2 mt-2 flex-wrap text-xs text-gray-300">
                                    {proj.stages.map((stage, idx) => (
                                        <span
                                            key={idx}
                                            className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${idx < completed
                                                ? "bg-green-600/20 border-green-600 text-green-400"
                                                : "bg-white/10 border-white/10"
                                                }`}
                                        >
                                            {idx < completed && <CheckCircle className="w-3 h-3" />}
                                            {stage}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Project;