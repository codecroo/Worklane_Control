import { useState } from "react";
import { motion } from "framer-motion";
import { typingVariants, fadeIn } from "../animation/variants";
import { Calendar, Users, CheckCircle, Search } from "lucide-react";
import { Card } from "../components/ui/Card"; // ✅ Your custom card

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
    {
        name: "Customer Feedback Portal",
        deadline: "2025-09-10",
        team: ["Arjun", "Sneha"],
        stages: ["UI", "Backend", "QA", "Deployment"],
        completed: 2,
    },
    {
        name: "Internal Tool Migration",
        deadline: "2025-10-05",
        team: ["Rahul", "Simran"],
        stages: ["Planning", "Execution", "QA"],
        completed: 1,
    },
];

const Projects = () => {
    const [search, setSearch] = useState("");

    const filtered = projects.filter((proj) => {
        const s = search.toLowerCase();
        return (
            proj.name.toLowerCase().includes(s) ||
            proj.team.some((t) => t.toLowerCase().includes(s)) ||
            proj.stages.some((stage) => stage.toLowerCase().includes(s))
        );
    });

    return (
        <div className="min-h-screen bg-black text-white pb-24 px-6 pt-10 max-w-[1440px] mx-auto">
            {/* Heading */}
            <motion.h1
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl font-bold inline-block overflow-hidden whitespace-nowrap leading-tight pb-2"
            >
                Projects
            </motion.h1>

            {/* Subtext and Search */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex justify-between items-center mt-4 mb-8 flex-wrap gap-4"
            >
                <p className="text-sm text-gray-400">
                    View and manage your ongoing projects, deadlines, and team assignments.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative"
                >
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white/5 backdrop-blur border border-white/20 px-8 py-2 text-sm rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 min-w-[220px]"
                    />
                </motion.div>
            </motion.div>


            {/* Grid with your custom Card */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
            >
                {filtered.map((proj, i) => {
                    const percent = Math.floor((proj.completed / proj.stages.length) * 100);

                    return (
                        <Card key={i} className="!p-5 flex flex-col gap-3">
                            {/* Project Title */}
                            <h2 className="text-xl font-semibold">{proj.name}</h2>

                            {/* Team Info */}
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Users className="w-4 h-4" />
                                {proj.team.join(", ")}
                            </div>

                            {/* Deadline */}
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    Deadline: <span className="text-white">{proj.deadline}</span>
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-2">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Progress</span>
                                    <span>{percent}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>

                            {/* Stages */}
                            <div className="flex flex-wrap gap-2 text-xs mt-1">
                                {proj.stages.map((stage, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-center gap-1 px-2 py-1 rounded-full border ${idx < proj.completed
                                            ? "bg-green-600/20 text-green-300 border-green-500"
                                            : "bg-white/10 text-white border-white/10"
                                            }`}
                                    >
                                        {idx < proj.completed && <CheckCircle className="w-3 h-3" />}
                                        {stage}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Projects;
